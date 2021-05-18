//On utilise ".search" dans "location" pour récupérer ce qui se trouve derrière les informations contenues
//dans l'url à partir du "?".
const searchParams = location.search;
//On utilise la méthode "URLSearchParams" qui liste tous les paramètres d'une url
//pour récupérer l'id de l'album, grâce au ".get".
const urlSearchParams = new URLSearchParams(searchParams);
const trackId = urlSearchParams.get('id');

//ciblage des balises et identifiants
const trackTitle = document.querySelector('#trackTitle');
const albumCover = document.querySelector('#albumCover');
const artistName = document.querySelector('#artistName');
const artistPic = document.querySelector('#artistPic');
const duration = document.querySelector('#duration');
const releaseDate = document.querySelector('#releaseDate');
const player = document.querySelector('#player');
const albumLink = document.querySelector('#albumLink');
const albumTitle = document.createElement('p');
const artistLink = document.querySelector('#artistLink');
const albumInfos = document.querySelector('#albumInfos');

//on utilise "fetch" pour appeler l'API Deezer et récupérer toutes les datas souhaitées dont elle dispose.
fetch(`https://api.deezer.com/track/${trackId}`)
    .then((response) => {
        //on utilise ".json" pour convertir la réponse en JSON, et on fait un nouveau ".then" à l'interieur 
        //du premier avec la "response" convertie, qu'on peut alors nommer "result".
        response.json()
            .then((result) => {
                //on crée dynamiquement l'arborescence HTML qui découle de notre "trackTitle", et on 
                //affilie à chaque balise la data qui nous intéresse.
                trackTitle.innerHTML = `${result.title}`;
                albumCover.setAttribute('src', `${result.album.cover_xl}`);
                albumTitle.innerText = `(Album : ${result.album.title})`;
                albumTitle.classList.add('album-title');
                albumLink.appendChild(albumTitle);
                albumLink.setAttribute('href', `album.html?id=${result.album.id}`);
                artistLink.setAttribute('href', `artist.html?id=${result.artist.id}`);
                artistName.innerText = `${result.artist.name}`;
                artistPic.setAttribute('src', `${result.artist.picture_xl}`);
                duration.innerText = `Durée : ${secondsToHms(result.duration)}`;
                releaseDate.innerText = `Date de sortie : ${result.release_date}`;
                player.setAttribute('src', `${result.preview}`);
                const deezLink = document.querySelector('#deezLink');
                deezLink.setAttribute('href', `https://www.deezer.com/fr/track/${result.id}`);
                const favCtnr = document.createElement('div');
                favCtnr.classList.add('favCtnr');
                albumInfos.appendChild(favCtnr);
                const favInput = document.createElement('input');
                favInput.setAttribute('id', `${result.id}`);
                favInput.setAttribute('type', 'checkbox');
                favCtnr.appendChild(favInput);
                const favLab = document.createElement('label');
                favLab.setAttribute('for', `${result.id}`);
                favLab.innerText = '❤';
                favCtnr.appendChild(favLab);
                favInput.onclick = () => {
                    updateStorage(result.id);
                };

                //on vérifie à l'ouverture de la page si la liste de résulats contient
                //des favoris. Si c'est le cas, l'utilisateur en est informé visuellement
                //par la checkbox cochée.
                const isChecked = id => {
                    const storedIds = window.localStorage.getItem("deezweb_jrm");
                    let storageArray = [];
                    if (storedIds) {
                        storageArray = JSON.parse(storedIds);
                    }
                    if (storageArray.includes(id)) {
                        favInput.checked = true;
                    }
                };
                isChecked(result.id);
            }
            );
    });
