const APIKEY = "4338843264eb2e469482cf1f62e5eb61";

/****** PARTIE TENDANCES : AFFICHE LES 3 PREMIERS FILMS TENDANCE DU JOUR*******/

// Fonction qui s'auto appelle (grâce à la paire de parenthèse à la fin) - remplace une fonction main placée en début de code - 
// attend et récupère les résultats de la promesse de la fonction fetch et affiche les films en dupliquant les cartes
(async function(){
    const MOVIES = await getTrendMovies();   // Await permet d'attendre que la promesse soit résolue pour récup les résultats - On doit ajouter async pour que cela fonctionne
    const IMAGE_URL = await getImageURL();   // Idem
    // console.log(MOVIES);
    // console.log(IMAGE_URL);
    for (movie of MOVIES){                  // Permet de parcourir chaque objet film du tableau et utilise la fonction displayMovie pour afficher chaque objet   
        displayMovie(movie, IMAGE_URL);
    }

})()

// API Call : retourne un tableau des 3 films tendances du jour (possibilité de modifier dans le code le nb de film retourné)
// (On utilise le mot clé return pour pouvoir epxloiter les resultats à l'appel de la fonction)
 function getTrendMovies() {
    let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&language=fr`;
    return fetch(url)
    .then(function(response) {
        return response.json();                     // retourne les données convertie en format JSON
    })
    .then(function(data){                           // récupère les données JSON et les retourne dans un tableau (longeur modifiable) 
        let moviesList = new Array();
        let i = 0;
        while ( i <= 2) {
            moviesList.push(data.results[i]);
            i = i + 1;
        }
        return moviesList;
    })
    .catch(function(err){
        console.log("Erreur : " + err);
    });
 }

 // API Call : récupère la base URL des images
 // URL image =  "base_url" + taille de type "w-500" + chemin spécifique de l'img
 function getImageURL() {
    let url = `https://api.themoviedb.org/3/configuration?api_key=${APIKEY}`;
    return fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // console.log(data);
        let urlImage = data.images.base_url + data.images.poster_sizes[6];
        return urlImage;
    })
    .catch(function(err){
        console.log("Erreur : " + err);
    });
 }


// 1. Prend en paramètre un objet et la base URL des images
// 2. Récupère un template HTML
// 3. Duplique le template et modifie le contenu de certaines balises en y insérant les propriétés de l'objet en paramètre
// 4. Créer dans le DOM ??? la place de l'élement cloné
function displayMovie(movie, imageUrl) {
    let templateElt = document.querySelector(".templateMovie");
    let cloneElt = document.importNode(templateElt.content,true);
    
    cloneElt.querySelector(".movieImage").setAttribute("src", imageUrl + movie.poster_path);
    cloneElt.querySelector(".movieTitle").textContent = movie.title;
    cloneElt.querySelector(".movieDescription").textContent = movie.overview;
    cloneElt.querySelector(".movieRate").textContent = movie.vote_average;

    document.querySelector("#movieContainer").appendChild(cloneElt);
}


/***** PARTIE RECHERCHE ******/

// Fonction asynchrone qui est appelée lorsqu'on clique sur le bouton "OK" 
// Attend le résultat de la recherche (l'input saisi par le user)
// Appelle la fonction qui contacte l'API et attend ses résultats
//  Récupère les résultats de l'API et pour chaque résultat, appelle la fonction qui va les afficher
async function search(){
    const SEARCH_INPUT = await getSearchValue();
    const RESULTS = await getSearchedMovie(SEARCH_INPUT); // Même avec await on n'a pas les résultats car la fonction s'éxecute avant de récupérer la variable title ? --> ajout d'un await à la fonction getSearchValue pour attendre d'avoir ce résultat avant de continuer
    const IMAGE_URL = await getImageURL();
    console.log(SEARCH_INPUT);
    console.log(RESULTS);
    for (result of RESULTS) {
        displaySearchMovies(result, IMAGE_URL);
    }
}

// Ecoute l'évenement submit du formulaire
// Enlève son comportement par défaut
// Appelle la fonction asynchrone search (qui va chercher les résultats et les afficher)
document.querySelector("form").addEventListener('submit', function(e){
    e.preventDefault();
    search();
})

// Récupère la valeur de l'input search et la retourne
function getSearchValue() {
    let searchInput = document.getElementById("search-input").value;
    return searchInput;
}

// API Call : Récupère le ou les films en fonction du titre rentré
function getSearchedMovie(title) {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=fr&query=${title}`;
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return data.results;
        })
        .catch(function(err){
            console.log("Erreur : " + err);
        });
}

// Similaire à la fonction displayMovie sauf que emplacement dans le doc HTML différent
// 1. Prend en paramètre un objet et la base URL des images
// 2. Récupère un template HTML
// 3. Duplique le template et modifie le contenu de certaines balises en y insérant les propriétés de l'objet en paramètre
// 4. Créer dans le DOM ??? la place de l'élement cloné
function displaySearchMovies(result, imageUrl) {
    let templateElt = document.querySelector(".templateMovieSearched");
    let cloneElt = document.importNode(templateElt.content,true);
    
    cloneElt.querySelector(".movieImage").setAttribute("src", imageUrl + result.poster_path);
    cloneElt.querySelector(".resultMovieTitle").textContent = result.title;
    cloneElt.querySelector(".resultMovieDescription").textContent = result.overview;
    cloneElt.querySelector(".resultMovieRate").textContent = result.vote_average;

    document.querySelector("#searchContainer").appendChild(cloneElt);
}


/****** POUR ALLER PLUS LOIN  **********/
// Proposer la sélection de tops différents (top 3, top 6, top 10....)
// Trier la sortie des films tendances par la note ?
// Afficher en premier dans la recherche les films avec une note
// traiter le cas :
    // film sans img
    // film sans img et sans description
    // film titre doublon 
    // film avec titre mais sans image et sans description
// ajouter des options de recherche ? Date de sortie, réalistaeur, genre...
// Gérer le zoom sur l'image d'arrière plan quand les resultats s'ajoutent