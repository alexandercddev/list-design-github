const search = document.getElementById('search');
const pFollowers = document.getElementById('followers');
const pFollowing = document.getElementById('following');
const pPublicRepos = document.getElementById('publicRepos');
const imgAvatar = document.getElementById('avatar');
const aGithub = document.getElementById('github');
const sNotFound = document.getElementById('notFound');

window.addEventListener('load', async ()=> {
    await fecthGith('alexandercddev');
});

search.addEventListener('click', async (e) => {
    e.preventDefault();
    const { value: userName} = document.getElementById('userName');
    if(userName.trim().length > 0) {
        await fecthGith(userName);
    }
});

const fecthGith = async userName => {
    const response = await fetch(`https://api.github.com/users/${userName}`)
        .then(response => response.json());
        const {
            followers,
            following,
            public_repos,
            avatar_url,
            html_url
        } = response;
        const notFound = response?.message === 'Not Found';
        if(!notFound) {
            pFollowers.innerText = `${followers} followers`;
            pFollowing.innerText = `${following} following`;
            pPublicRepos.innerText = `${public_repos} repositories`;
            imgAvatar.src = avatar_url;
            aGithub.href = html_url;
            sNotFound.innerText = "";
        } else {
            sNotFound.innerText = `Not Found ${userName}`;
        }
}
