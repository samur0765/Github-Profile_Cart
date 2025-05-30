const API_URL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

async function getUser(username) {
    try {
        const { data } = await axios(API_URL + username)

        createUserCard(data)
        getRepos(username)
    } catch (msg) {
        createErrorCard("Aradığınız Kullanıcı Bulunamadı...")
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user)

        search.value = ""
    }

});



function createUserCard(user) {

    const userName = user.name || user.login;
    const userBio = user.bio ? `<p>${user.bio}</p>` : " ";

    const cardHTml = `
     <div class="card">
            <img class="user-image" src=${user.avatar_url} alt=${user.name}>
            <div class="user-info">
                <div class="user-name">
                    <h2>${user.name}</h2>
                    <small>@${user.login}</small>
                </div>
                <p class="user-bio">${userBio}
                </p>

                <ul>
                    <li>
                        <i class="fa-solid fa-user-group"></i> ${user.followers}
                        <strong>Followers</strong>
                    </li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>
                        <i class="fa-solid fa-bookmark"></i> 21 <strong>${user.public_repos}</strong>
                    </li>
                </ul>
                <div class="repos" id="repos">
                </div>
            </div>
        </div>`
    main.innerHTML = cardHTml;
}

function createErrorCard(msg) {
    const cardErrorHTml = `
    <div class="card">
    <h2>${msg}</h2>
    </div>
    `

    main.innerHTML = cardErrorHTml;
}
async function getRepos(username) {
    try {
        const { data } = await axios(API_URL + username + '/repos')

        addReposToCard(data)
    } catch (err) {
        createErrorCard('Repoları çekerken hata oluştu.')
    }
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos.slice(0, 3).forEach((repo) => {
        const reposLink = document.createElement('a')
        reposLink.href = repo.html_url
        reposLink.target = '_blank'
        reposLink.innerHTML = ` <i class="fa-solid fa-book-bookmark"></i> ${repo.name} `

        reposEl.appendChild(reposLink)
    })
}