<?php

error_reporting(E_ERROR | E_PARSE);
$username = $_POST['username'];
$password = md5($_POST['password']);
if($username && $password)
{

$connect = mysql_connect("localhost","root","") or die("Couldn't connect!");
mysql_select_db("dashboard") or die("Couldn't find db");
$query= mysql_query("SELECT username,password From users WHERE username='$username'");
$numrows = mysql_num_rows($query);
	if ($numrows!=0)
	{
	//code to login
	 while ( $row = mysql_fetch_array ($query))
	 	{ $department = $row['department'];
		   $dbusername = $row['username'];
			$dbpassword = $row['password'];
		}
		if($username==$dbusername && $password==$dbpassword)
		{
			$q =mysql_query("SELECT id From users WHERE username='$username'");
			while($row = mysql_fetch_assoc($q))
		{
		$id = $row['id'];
		$dept=$row['department'];
		}
			session_start();
			
			$_SESSION['username']=$username;
$query= mysql_query("SELECT username,type From users WHERE username='$username' AND type='student'");
$numrows = mysql_num_rows($query);
$query1= mysql_query("SELECT username,type From users WHERE username='$username' AND type='teacher'");
$numrows1 = mysql_num_rows($query1);
$query2= mysql_query("SELECT username,type From users WHERE username='$username' AND type='admin'");
$numrows2 = mysql_num_rows($query2);

	if ($numrows!=0)
			header('Location:../profile.php?name='.$username.'&id='.$id);
			else if($numrows1!=0)
			header('Location:../faculty.php?name='.$username.'&id='.$id);
			//if($numrows2!=0)
			else if($numrows2!=0)
			header('Location:../Adminpanel.php');
			
			//echo "welcome ". $_SESSION['username'];
			//$n=$_SESSION['username'];
			//$query1= mysql_query("update users set login_time=now() where username='$n' ");
			
		}
		
		else
		 echo "Incorrect password!";
		}
		
	
	else
	die("That user does't exist!");
	
}
else
   die("Please enter  username and Password!");
	




?>