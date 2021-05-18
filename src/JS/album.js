//On utilise ".search" dans "location" pour récupérer ce qui se trouve derrière les informations contenues
//dans l'url à partir du "?".
const searchParams = location.search;
//On utilise la méthode "URLSearchParams" qui liste tous les paramètres d'une url
//pour récupérer l'id de l'album, grâce au ".get".
const urlSearchParams = new URLSearchParams(searchParams);
const albumId = urlSearchParams.get('id');

//ciblage des balises et identifiants
const artistLink = document.querySelector('#artistLink');
const albumTitle = document.querySelector('h1');
const artistName = document.querySelector('h2');
const cover = document.querySelector('img');
const deezLink = document.querySelector('#deezLink');

//on utilise "fetch" pour appeler l'API Deezer et récupérer toutes les datas souhaitées dont elle dispose.
fetch(`https://api.deezer.com/album/${albumId}`)
	.then((response) => {
		//on utilise ".json" pour convertir la réponse en JSON, et on fait un nouveau ".then" à l'interieur 
		//du premier avec la "response" convertie, qu'on peut alors nommer "result".
		response.json()
			.then((result) => {
				//on affilie chaque data qui nous intéresse à la cible concernée.
				albumTitle.innerText = `${result.title}`;
				artistName.innerText = `${result.artist.name}`;
				cover.setAttribute("src", `${result.cover_big}`);
				deezLink.setAttribute("href", `https://www.deezer.com/fr/album/${albumId}`);
				artistLink.setAttribute('href', `artist.html?id=${result.artist.id}`);

				//pour les titres des morceaux, on utilise une boucle.
				for (let i = 0; i < result.tracks.data.length; i++) {
					const track = result.tracks.data[i].title;
					const duration = result.tracks.data[i].duration;
					const trackList = document.querySelector('#trackList');
					const trackLink = document.createElement('a');
					const trackTitle = document.createElement('li');
					trackLink.setAttribute('href', `track.html?id=${result.tracks.data[i].id}`);
					trackList.appendChild(trackLink);
					trackLink.appendChild(trackTitle);
					trackTitle.innerText = `${track} (${secondsToHms(duration)})`;
				}
			});
	});