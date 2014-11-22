<!DOCTYPE html>
 <html lang="en" class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="UTF-8" />
        <title>Change My Password</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <meta name="description" content="Change my password" />
        <link rel="shortcut icon" href="../favicon.ico"> 
        <link rel="stylesheet" type="text/css" href="css/demo.css" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/animate-custom.css" />
		<link rel="stylesheet" href="css/reset.css" type="text/css" media="all">
<link rel="stylesheet" href="css/style.css" type="text/css" media="all">
    </head>
    <body>
        <div class="container"><!--top bar -->
            <div class="codrops-top">
                <span class="right">
                    <a href=" oursite/VJTI.html">
                        <strong>Back to the index page</strong>
                    </a>
                </span>
                <div class="clr"></div>
            </div><!--/ top bar -->
            <header>
                <h1>Change My Password  Form </h1>
            </header>
            <section>				
                <div id="container_demo" >
                    <div id="wrapper">
                        <div id="login" class="animate form">
                            <form  action='change_password.php' autocomplete="on" method='POST'> 
                                <h1>Change Paassword</h1> 
                               
                                <p> 
                                    <label for="password" class="youpasswd" data-icon="p"> Your current password </label>
                                    <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" /> 
                                </p>
                               
                               
                                <p> 
                                    <label for="passwordsignup" class="youpasswd" data-icon="p">New password </label>
                                    <input id="passwordsignup" name="n_password" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
                                <p> 
                                    <label for="passwordsignup_confirm" class="youpasswd" data-icon="p">Please confirm your password </label>
                                    <input id="passwordsignup_confirm" name="repeatpassword" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
								 
                                <p class="signin button"> 
									<input type="submit" value="Change" name="change"/> 
								</p>
                                
                            </form>
                        </div>
						
                    </div>
                </div>  
            </section>
        </div>
    </body>
</html>
<?php
$password = md5($_POST['password']);
$password = md5(strip_tags($_POST['n_password']));
$submit = $_POST['change'];
$repeatpassword = md5(strip_tags($_POST['repeatpassword']));
if($submit)
{
include 'connection.php';
if(isset($name)
{
if($n_password && $password && $repeatpassword)
		{	
		$query= mysql_query("SELECT username,password From users WHERE username='$name' AND password='$password'");
		$numrows = mysql_num_rows($query);
		if ($numrows!=0)
		{
		 while ( $row = mysql_fetch_array ($query))
	 	{ 
		   $dbusername = $row['username'];
			$dbpassword = $row['password'];
		}
		if($name==$dbusername && $password==$dbpassword)
		{
			if($n_password == $repeatpassword)
			{
						$queryreg = mysql_query("		
						update users set password=$n_password where password=$password
							
						");
						die("Update successful <a href = '..\oursite\LoginRegistrationform\index.html'>To login</a> ");
						


					}
			}
			else
						echo "You entered wrong credentials";

		}
		}
		}
		}
?>