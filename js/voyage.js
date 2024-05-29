function fetchEtAffichePosts(continentChoisi) {
  // URL of the WordPress REST API
  // let post_id = 6; 
   let url = `https://gftnth00.mywhc.ca/tim07/wp-json/wp/v2/posts?per_page=57`;// URL du WHC
 // let url = `http://localhost:8085/4w4-2024-gr1/wp-json/wp/v2/posts?per_page=57`; // URL du serveur local

  // fetch pour recuperer les donnees associees a l'URL
  fetch(url)
    // Une fois que la requête est terminée, récupérez la réponse JSON 
    .then(function (response) {
      // Check if the response is OK (HTTP status 200)
      if (!response.ok) {
        throw new Error(
          "HTTP request failed with status " + response.status
        );
      }
      return response.json();
    })

    .then(function (data) {
      // La variable "data" contient la réponse JSON
      //  console.log(data);
      // Selectionner l'element HTML ou nous voulons afficher les donnees
      let restapi = document.querySelector(".contenu__restapi");

      // Vide le contenu precedant
      restapi.innerHTML = '';

      // Filtrer les données pour ne conserver que les articles associes au continent choisi
      let filteredData = data.filter(function (article) {
        if (article.acf && article.acf.continent) {
          let continents = article.acf.continent.split(',');
          return continents.includes(continentChoisi);
        }
        return false;
      });
      // Maintenant, vous pouvez traiter les données comme vous le souhaitez
      // Par exemple, extraire les titres des articles comme dans l'exemple précédent
      filteredData.forEach(function (article) {

        let titre = article.title.rendered;
        let contenu = article.content.rendered;
        //
        contenu = contenu.substring(0, 200) + '...';

          console.log(article.acf);

        let carte = document.createElement("div");
        carte.classList.add("restapi__carte");

        carte.innerHTML = `
        <h2>${titre}</h2>
        <p>${contenu}</p><br>

        <p>Ville avoisinante: ${article.acf.ville_avoisinante}</p>
        <p>Température maximale: ${article.acf.temperature_maximale}</p>
        <p>Température minimale: ${article.acf.temperature_minimale}</p>
        <p>Précipitations: ${article.acf.precipitation}</p>
        `;
        restapi.appendChild(carte);
      });
    })
    .catch(function (error) {
      // Gérer les erreurs
      console.error("Erreur lors de la récupération des données :", error);
    });
}

// Un ecouteur d'evenement regarde si le contenu du document est charge
document.addEventListener('DOMContentLoaded', function () {
  // Fetch and display the posts associated with 'Europe' by default
  fetchEtAffichePosts('Europe');

  // On selectionnne l'element avec l'id continent et on ajoute un ecouteur d'evenement
  document.querySelector('#continent').addEventListener('change', function () {
    // Le continent choisi est stocké dans la variable continentChoisi
    let continentChoisi = this.value;
    // 
    fetchEtAffichePosts(continentChoisi);

    console.log("rest API")
  });
});
