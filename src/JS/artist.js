//On utilise ".search" dans "location" pour récupérer ce qui se trouve derrière les informations contenues
//dans l'url à partir du "?".
const searchParams = location.search;
//On utilise la méthode "URLSearchParams" qui liste tous les paramètres d'une url
//pour récupérer l'id de l'artiste, grâce au ".get".
const urlSearchParams = new URLSearchParams(searchParams);
const artistId = urlSearchParams.get('id');

//ciblage des balises et identifiants
const artistName = document.querySelector('#artistName');
const artistPic = document.querySelector('#artistPic');
const numberOfAlbums = document.querySelector('#numberOfAlbums');
const numberOfFans = document.querySelector('#numberOfFans');
const deezArtistPage = document.querySelector('#deezArtistPage');
const s2Title = document.querySelector('#s2Title');
const tracksList = document.querySelector('#tracksList');
const albumsList = document.querySelector('#albumsList');

//on utilise "fetch" pour appeler l'API Deezer et récupérer toutes les datas souhaitées dont elle dispose.
fetch(`https://api.deezer.com/artist/${artistId}`)
    .then((response) => {
        //on utilise ".json" pour convertir la réponse en JSON, et on fait un nouveau ".then" à l'interieur 
        //du premier avec la "response" convertie, qu'on peut alors nommer "result".
        response.json()
            .then((result) => {
                //on affilie chaque data qui nous intéresse à la cible concernée.
                artistName.innerText = `${result.name}`;
                artistPic.setAttribute('src', `${result.picture_xl}`);
                numberOfAlbums.innerText = `Nombre d'albums : ${result.nb_album}`;
                numberOfFans.innerText = `Nombre de fans : ${result.nb_fan}`;
                deezArtistPage.setAttribute('href', `https://www.deezer.com/fr/artist/${artistId}`);
                s2Title.innerHTML = `Top 5 de <span>${result.name}</span> sur Deezer :`;

            }
            );
    })

fetch(`https://api.deezer.com/artist/${artistId}/top`)
    .then((response) => {
        response.json()
            .then((result) => {
                for (let i = 0; i < result.data.length; i++) {
                    const element = result.data[i];
                    const duration = secondsToHms(`${element.duration}`);

                    topTrack = document.createElement('li');
                    tracksList.appendChild(topTrack);
                    topTrack.classList.add('topTrack');                  
                    trackLink = document.createElement('a');
                    topTrack.appendChild(trackLink);
                    trackInfos = document.createElement('p');
                    trackLink.appendChild(trackInfos);
                    trackInfos.innerText = `${element.title} : ${duration}`;
                    trackLink.setAttribute('href', `track.html?id=${element.id}`);

                };
            });
    })

fetch(`https://api.deezer.com/artist/${artistId}/albums`)
    .then((response) => {
        response.json()
            .then((result) => {
                for (let i = 0; i < result.data.length; i++) {
                    const element = result.data[i];
                    album = document.createElement('li');
                    albumsList.appendChild(album);
                    album.innerHTML = `
                    <a href = album.html?id=${element.id}>
                        <figure>
                            <figcaption>${element.title}</figcaption>
                            <img src="${element.cover_medium}" alt="couverture de l'album">
                        </figure>
                    </a>
                    `;



                };
            });
    })
