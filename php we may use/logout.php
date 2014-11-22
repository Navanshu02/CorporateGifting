<?php

session_start();
if(isset($_SESSION['username']))session_destroy();

echo "You've been logged out. <a href='index.html'>Click here</a> to return.";

?>