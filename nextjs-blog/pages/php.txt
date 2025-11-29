<html>
<head>
    <title>My PHP Page</title>
</head>
<body>
    
    <?php

      $x = "Hello, World!";

        echo "<h1>$x</h1>";

        echo '<p>$x</p>';
    ?>  

    <p>Plain Static HTML</p>

    <h1>Shoo! Cha! <?php echo $_SERVER["REQUEST_METHOD"]; ?> </h1>

    <h2>Sup variable is <?php echo $_SERVER["Sup"]; ?> </h2>

    <?php
     $y = 'yes';
     if ($y === 'yes') {
        echo "<p>Yippie!</p>";
     } else {
        echo "<p>Nuh uh!</p>";
     }

     $z = 0;
     while ($z < 100) {
        echo $z . ', ';
        $z++;

     }

     for ($q = 1; $q < 40; $q = $q + 2) {
        echo "<h$q>What heading?</h$q>";
     }

    ?>

</body>
</html>