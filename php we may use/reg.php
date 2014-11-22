<?php
	error_reporting(E_ERROR | E_PARSE);
	$submit = $_POST['submit'];

	$code = $_POST['code'];
	$id = $_POST['id'];
	$username = strip_tags($_POST['username']);
	$email = $_POST['email'];
	$password = md5(strip_tags($_POST['password']));
	$repeatpassword = md5(strip_tags($_POST['repeatpassword']));
	$program = $_POST['program'];
	//$type = $_POST['type'];
	$department = $_POST['department'];
	
	if($submit)

	{
		$connect = mysql_connect ("localhost","root","");
		mysql_select_db("dashboard");
		session_start();
		if(strpos($code,'stu')!==false){//echo 'u are student';
		$type='student';}
		if(strpos($code,'tch')!==false){//echo 'u are teacher';
		$type='teacher';}
					
		$namecheck = mysql_query("SELECT Username FROM users WHERE username ='$username'");
	     $codecheck=mysql_query("SELECT code FROM record WHERE code ='$code'");
		  $count = mysql_num_rows($namecheck);
		$count1 = mysql_num_rows($codecheck);
		
		//echo ' Count ', $count;
		//echo ' Count2  ',  $count1;
		
		if($count!=0)
			{
			die("Username already taken!");

			}
			if($count1===0)
			{
			die("Invalid!");

			}

		
		if($code && $username && $password && $repeatpassword)

		{
			
			
			if($password == $repeatpassword)
			{
			
			
				
				if(strlen($username) >25 || strlen ($password)==0)
				{
				echo "Length of username inappropriate or missing password";
				}
				
				else
					
					{
					$insert=mysql_query("INSERT INTO users(code,id,Username,PASSWORD,email,department,type) VALUES ('$code','$id','$username','$password','$email','$department','$type') ") or die("Query failed");

						
						if($type=='student'){
						$q=mysql_query("INSERT INTO student VALUES ('$id','$username','$program','$department')");//echo"inserted in students";
						}
						else
						$t=mysql_query("INSERT INTO teacher VALUES ('$id','$username')");
						die("You have been registerd! <a href = '.\index.html'>Login</a> ");
						}

			

			}
			else
			
			echo "Your passwords do not match!";
			


		}

		else
		
		echo "Please fill in <b>all</b> fields!";
	
	
	}

