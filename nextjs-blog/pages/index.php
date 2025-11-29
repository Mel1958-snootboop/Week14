<?php
    // everything betweeen open and close php is interpreted on server by php interpreter

    // Step 1. Tell wp api tp load our parent theme's css styles
    // In 2 parts: (1) calling a built-function in wp api named add_action() that extend the wp api with custom code
    // add_action() takes 2 arguments: A string for the api hook we want to extend
     add_action('wp_enqueue_scripts', 'enqueue_parent_styles');


    // Second part of Step 1. (2) define our own custom function that holds the code we are using to extend the wp api

   function enqueue_parent_styles() {
      wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css');
   }

   // Step 2. Tell wp api to register a new REST url endpoint
   // In 2 parts: (1) calling built-in add_action() to extend the wp api with custom code
   add_action('rest_api_init', 'register_my_route');

   // (2) our custom function to register the new REST endpoint URL
   function register_my_route() {
      // register_rest_route() take 3 arguments
      // 1: root url for our rest route
      // 2: rest of url for our rest route, including any URL parameter we want to get
      register_rest_route(
          'twentytwentyone-child/v1',
          '/latest-posts/(?P<category_id>\d+)',
          array(
              'methods' => 'GET',
              'callback' => 'get_latest_posts_by_category'
            )
        );
    }

    // Step 3. Define our custom callback function that WP will run when the REST API endpoint URL we defined is recieved 
    function get_latest_posts_by_category($request) {
        // We need to get out of the $request the category_id value WP passed us
        $args = array(
            'category' => $request['category_id']
        );
        // Now we can call the built-in function in the wp api named get_posts()
        // get_posts() takes a single associative array as an argument
        $posts = get_posts( $args );

        // Check to make sure wp returned at least one post
        if ( empty($posts) ) {
            return new WP_Error( 
              'empty_category', 
              'There are no posts to display', 
              array('status' => 404) 
            );
        }

        // If we make it to here. WP get_posts() returned at least one post
        // So let us send back the data for the found post(s)
        // Capitalize Response
        $response = new WP_REST_Response($posts);
        $response -> set_status(200); // HTTP OK status code

        // Now we send back the rest response object filled up with all of the posts we found
        return $response;
    
    }



    // Also in Week 13:

    // tell wp api to register a new REST url endpoint
    add_action('rest_api_init', 'register_my_route2');

function register_my_route2() {
        // our custom funtion to register the new REST endpoint URL
      register_rest_route(
          'twentytwentyone-child/v1',
          '/special',
          array(
              'methods' => 'GET',
              'callback' => 'get_posts_via_sql'
            )
        );
    }

// our custom callback function that WP will run when the REST API endpoint URL we defined is recieved
function get_posts_via_sql(){
     // Step 1. we need to access to the $wpdb global variable 
     global $wpdb;

     // Step 2.get wordpress sql table prefix string to use in query, type "wp_"
     $pre = $wpdb -> prefix;

     // Step 3. define a sql query string that uses inner join to merge results across two tables
     // EXAMPLE: $query = "SELECT * FROM wp_posts";
     // SELECT wp_posts.ID, wp_posts.post_tittle, wp_posts.post_content, wp_users.user_login 
     // FROM wp_posts 
     // INNER JOIN wp_users 
     // ON wp_posts.post_author = wp_users.ID 
     // WHERE wp_posts.post_status = 'publish';
}    $query = "SELECT " . $pre . "wp_posts.ID, ";
     $query .= $pre . "posts.post_tittle, ";
     $query .= $pre . "posts.post_content, ";
     $query .= $pre . "users.user_login ";
     $query .= "FROM " . $pre . "posts";
     $query .= "INNER JOIN " . $pre . "users ";
     $query .= "ON " . $pre . "posts.post_author = " . $pre . "users.ID ";
     $query .= "WHERE " . $pre . "posts.post_status = 'publish';";

     // Step 4. send the sql query via built-in method get_results() of the $wpdb global object
     $results = $wpdb -> get_results( $query );

     // Step 5. send back the data for the found post(s) using wp rest api
     $response = new WP_REST_Response( $results );
     $response -> set_status(200);

     return $response;




    //
    // Week 13: Add two new custom post types via wp api
    function add_custom_post_types() {
        // post type named 'contact'
        register_post_type(
            'contact',
            array(
                'labels' => array (
                    'name' => __('Contacts', 'textdomain'),
                    'singular_name' =>__('Contact', 'textdomain')
                ),
                'public' => true,
                'has_archive' => true
            )
        );
       // post type named 'product'
        register_post_type(
            'product',
            array(
                'labels' => array (
                    'name' => __('Products', 'textdomain'),
                    'singular_name' =>__('Product', 'textdomain')
                ),
                'public' => true,
                'has_archive' => true
            )
        );

    }
    add_action('init', 'add_custom_post_types');

?>