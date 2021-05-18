//ciblage du menuBtn et de la navbar
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

//on crée une variable "menuOpen" qu'on initialise à "false".
let menuOpen = false;
//on déclenche un événement au clic sur le "menuBtn"
menuBtn.addEventListener('click', () => {
    //si "menuOpen" n'est pas vérifié, on ajoute une classe de style "open" au bouton et on passe 
    //"menuOpen" à true. On ajoute en parallèle une classe "open" à la nav.
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
        nav.classList.add('open');
        //si "menuOpen" est "true", on retire la classe et repasse "menuOpen" à false. On supprime la classe
        //"open" de nav.
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
        nav.classList.remove('open');
    }
});