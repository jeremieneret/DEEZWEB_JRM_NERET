//ciblage des identifiants
const searchInput = document.querySelector('#searchInput');
const section2 = document.querySelector('#s2');
const trackContainer = document.querySelector('#trackContainer');

//l'API Deezer propose plusieurs types de recherches selon des critères définis qui 
//influenceront l'ordre dans lequel les résultats apparaitront sur notre page. 
//on crée une fonction pour afficher les résultats avec comme paramètre la "value" affiliée à "order".
function displayDeez(orderValue) {
    //on appelle l'API Deezer en définissant la valeur de "search" à partir de la saisie de l'input
    // de recherche, et celle de "order" avec notre paramètre "orderValue" créé précédemment.
    fetch(`https://api.deezer.com/search?q=${searchInput.value}&order=${orderValue}`)
        .then((response) => {
            //on utilise ".json" pour convertir la réponse en JSON, et on fait un nouveau ".then" à l'interieur 
            //du premier avec la "response" convertie, qu'on peut alors nommer "result".
            response.json()
                .then((result) => {
                    //on crée dynamiquement l'arborescence HTML qui découle de notre "trackContainer", et on 
                    //affilie à chaque balise la data qui nous intéresse, ainsi que des classes de style.
                    trackContainer.innerHTML = '';
                    for (let i = 0; i < result.data.length; i++) {
                        const album = document.createElement('li');
                        const albumLink1 = document.createElement('a');
                        const cover = document.createElement('img');
                        const infosContainer = document.createElement('div');
                        const albumLink2 = document.createElement('a');
                        const albumTitle = document.createElement('p');
                        const artistName_songTitle__container = document.createElement('div');
                        const artistLink = document.createElement('a');
                        const artistName = document.createElement('p');
                        const songLink = document.createElement('a');
                        const songTitle = document.createElement('p');

                        album.classList.add('album__container');
                        albumLink1.setAttribute('href', `../src/pages/track.html?id=${result.data[i].id}`);
                        cover.setAttribute('src', result.data[i].album.cover_big);
                        cover.classList.add('pic');
                        infosContainer.classList.add('infos__container');
                        albumLink2.setAttribute('href', `../src/pages/album.html?id=${result.data[i].album.id}`);
                        albumTitle.classList.add('album-title');
                        albumTitle.innerText = result.data[i].album.title;
                        artistLink.setAttribute('href', `../src/pages/artist.html?id=${result.data[i].artist.id}`);
                        artistName_songTitle__container.classList.add('AN-ST__container');
                        artistName.classList.add('artist-name');
                        artistName.innerText = `${result.data[i].artist.name} :`;
                        songLink.setAttribute('href', `../src/pages/track.html?id=${result.data[i].id}`);
                        songTitle.classList.add('song-title');
                        songTitle.innerText = result.data[i].title;
                        section2.appendChild(trackContainer);
                        trackContainer.appendChild(album);
                        album.appendChild(albumLink1);
                        albumLink1.appendChild(cover);
                        album.appendChild(infosContainer);
                        infosContainer.appendChild(albumLink2);
                        infosContainer.appendChild(artistName_songTitle__container);
                        albumLink2.appendChild(albumTitle);
                        artistName_songTitle__container.appendChild(artistLink);
                        artistName_songTitle__container.appendChild(songLink);
                        artistLink.appendChild(artistName);
                        songLink.appendChild(songTitle);
                        const favCtnr = document.createElement('div');
                        favCtnr.classList.add('favCtnr');
                        infosContainer.appendChild(favCtnr);
                        const favInput = document.createElement('input');
                        favInput.setAttribute('id', `${result.data[i].id}`);
                        favInput.setAttribute('type', 'checkbox');
                        favCtnr.appendChild(favInput);
                        const favLab = document.createElement('label');
                        favLab.setAttribute('for', `${result.data[i].id}`);
                        favLab.innerText = '❤';
                        favCtnr.appendChild(favLab);
                        favInput.onclick = () => {
                            updateStorage(result.data[i].id);
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
                        isChecked(result.data[i].id);

                    }
                });
        });
}
searchInput.addEventListener('change', () => {
    displayDeez();
});

//pour que l'utilisateur puisse choisir une préférence de tri, on a mis à sa disposition
//des boutons radio dans le HTML. Leurs valeurs respectives ont été renseignées avec les 
//options disponibles dans l'API. On les cible grâce à leur "name" commun. 
const orderOptions = document.getElementsByName("order");
for (let i = 0; i < orderOptions.length; i++) {
    const element = orderOptions[i];
    //lorsque l'utilisateur déclenche un choix de tri, on passe la valeur du radio
    //sélectionné en paramètre de la fonction qui affiche les résultats.
    element.addEventListener('change', () => {
        displayDeez(element.value);
    });
}