//on utilise la méthode ".getItem" dans le localStorage pour récupérer
//les datas qu'on a stockées dans l'espace dédié aux favoris : "deezweb_jrm".
const recup = localStorage.getItem('deezweb_jrm');
//on crée un tableau vide qui contiendra les id.
let idsArray = [];

//on cible l'<ul> dans laquelle nous allons construire dynamiquement nos <li>
const favoritesList = document.querySelector('#favoritesList');

//si une id est stocké dans "deezweb_jrm"
if (recup) {
    //on la convertit en JSON et on la stocke dans le tableau des id.
    idsArray = JSON.parse(recup);
    for (let i = 0; i < idsArray.length; i++) {
        const element = idsArray[i];

        //on utilise "fetch" pour appeler l'API Deezer et récupérer toutes les datas souhaitées dont elle dispose.
        fetch(`https://api.deezer.com/track/${element}`)
            .then((response) => {
                //on utilise ".json" pour convertir la réponse en JSON, et on fait un nouveau ".then" à l'interieur 
                //du premier avec la "response" convertie, qu'on peut alors nommer "result".
                response.json()
                    .then((result) => {
                        //on crée dynamiquement l'arborescence HTML qui découle de l'<ul> préalablement ciblée, et on 
                        //affilie à chaque balise la data qui nous intéresse.
                        const favoriteTrack = document.createElement('li');
                        favoritesList.appendChild(favoriteTrack);
                        favoriteTrack.setAttribute('id', 'favoriteTrack');
                        favoriteTrack.innerHTML +=
                            `<a id='trackLink' href="../pages/track.html?id=${result.id}">
                                <img src="${result.album.cover_medium}" alt="Photo de l'album">
                                <div id='trackInfosCtnr'>
                                    <div id='trackInfos'>
                                        <p id="artistName">${result.artist.name}</p>
                                        <div id='titlesInfos'>
                                            <p id="trackTitle">${result.title} </p>
                                            <p id="albumTitle"> //${result.album.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div class="favCtnr">
                                <input id="${result.id}" onclick="updateStorage(${result.id})" type="checkbox" checked>
                                <label for="${result.id}">❤</label>
                            </div>
                            `;
                    }
                    );
            });
    }
}

