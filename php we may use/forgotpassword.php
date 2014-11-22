<html><fieldset>
 <form  action="forgotpassword.php" autocomplete="on" method='POST'> 
								
                                <h1> Ask for new password </h1> 
								<p> 
                                    <label for="creationcode" class="uname" data-icon="u">Creation code</label>
                                    <input id="creationcode" name="code" required="required" type="text" placeholder="stu12345/tch12345:from our record during admission having stu/tch accordingly" />
                                </p>
								<p> 
								  <p> 
                                    <label for="emailsignup" class="youmail" data-icon="e" > Your email</label>
                                    <input id="emailsignup" name="email" required="required" type="email" placeholder="mysupermail@mail.com"/> 
                                </p>
								 <p class="signin button"> 
									<input type="submit" value="Submit" name="submit"/> 
								</p>
</form></fieldset>
<?php
		
error_reporting(E_ERROR | E_PARSE);
session_start();
$con = mysql_connect("localhost","root","");
if (!$con)
{
	die('Could not connect: ' . mysql_error());
}
mysql_select_db("dashboard", $con);
$submit = $_POST['submit'];
$code=$_POST['code'];
$email=$_POST['email'];
//$email=mysql_query("SELECT email From users where code='$code'");
$query= mysql_query("SELECT code,email From users where code='$code'");

$numrows = mysql_num_rows($query);

if ($numrows!=0)
	{
	//code to login
	 while ( $row = mysql_fetch_array ($query))
	 	{ $e = $row['email'];
		   $code= $row['code'];
		if($e!=$email){die("Please enter correct email-id and code");}
	
	//set SMTP php.ini
			ini_set("SMTP", "gmail.com");
			$anyNum = rand(20,500789000);
			$message="use this".$anynum;
			$to = $email;
			$subject = "Passwordrecovery";
			$headers="From: salonipatil17@gmail.com";
			$body ="This email from $name\n\n$message";
			mail($to, $subject, $body, $headers);
			echo "Your new temporary password will be mailed to you";
			$m=mysql_query("update users set password='$anynum' where code='$code'") or die("Query failed");
		}
		}
		else die("Please enter correct email-id and code");
?>