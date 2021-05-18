//on crée une fonction qui convertit les secondes au format h:mn:s.
function secondsToHms(d) {
    //on déclare que le paramètre est un nombre
    d = Number(d);
    //on calcule le nombre d'heures, de minutes et de secondes restantes
    // et on les stocke dans des variables "h", "m" et "s".
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    //si la valeur des mn et des s est supérieure à 0, on l'affiche, suivie
    //des chaines de caractères "mn" ou "s" respectives.
    let mDisplay = m > 0 ? m + (m == 1 ? "mn " : "mn ") : "";
    let sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
    return h + mDisplay + sDisplay;
}