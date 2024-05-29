<?php 
/**
 * Package Voyage
 * Version 1.0.0
 */
/*
Plugin name: Voyage
Plugin uri: https://github.com/eddytuto
Version: 1.0.0
Description: Permet d'afficher les destinations qui répondent à certains critères
*/  
echo header("Access-Control-Allow-Origin:http://localhost:8085");

function eddym_enqueue()
{
// filemtime // retourne en milliseconde le temps de la dernière modification
// plugin_dir_path // retourne le chemin du répertoire du plugin
// __FILE__ // le fichier en train de s'exécuter
// wp_enqueue_style() // Intègre le link:css dans la page
// wp_enqueue_script() // intègre le script dans la page
// wp_enqueue_scripts // le hook

$version_css = filemtime(plugin_dir_path( __FILE__ ) . "style.css");
$version_js = filemtime(plugin_dir_path(__FILE__) . "js/voyage.js");
wp_enqueue_style(   'em_plugin_voyage_css',
                     plugin_dir_url(__FILE__) . "style.css",
                     array(),
                     $version_css);

wp_enqueue_script(  'em_plugin_voyage_js',
                    plugin_dir_url(__FILE__) ."js/voyage.js",
                    array(),
                    $version_js,
                    true);
}
add_action('wp_enqueue_scripts', 'eddym_enqueue');
/* Création de la liste des destinations en HTML */
function creation_destinations(){
 // Fetch les posts
 $args = array(
    'post_type' => 'post', 
    'posts_per_page' => -1, // -1 pour afficher tous les posts
);
$posts = get_posts($args);

// Creation d'un tableau vide pour les continents
$continents = array();

// Boucle au travers les posts pour trouver les continents
foreach ($posts as $post) {
    $continent = get_field('continent', $post->ID); 

        // Separe les continents individuellement
        $post_continents = explode(',', $continent);

        // Boucle au travers des posts pour trouver les continents
        foreach ($post_continents as $continent) {
            // Si il y a plusieurs continents, on les sépare
            $continent = trim($continent); 
            // Si le continent existe, on le met dans le tableau
            if ($continent) {
                $continents[$continent] = true; 
            }
        }
    }

    // Creation du formulaire
    $form = '<form class="form__restapi">
                <label for="continent">Filtres</label>
                <select id="continent" name="continent">';

    // Ajoute une option dans le formulaire pour chaque continent
    foreach ($continents as $continent => $value) {
        $form .= "<option value='$continent'>$continent</option>";
    }

    $form .= '</select></form>';

    $contenu = '<div class="contenu__restapi"></div>';
    // Ajout du formulaire et du contenu
    return $form . $contenu;
}

add_shortcode('em_destination', 'creation_destinations');