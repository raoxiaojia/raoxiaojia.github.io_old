<?php
session_start();

	$request = $_POST['request'];
	if ($request == "Init")
	{
		$_SESSION["tops"]=30;
		$_SESSION["x"]=rand(0,29);
		$_SESSION["startx"] = $_SESSION["x"];
		$_SESSION["inc"]=rand(0,29);
		$_SESSION["stepcnt"] = 0;
		$_SESSION["oknewgame"] = 1;
		$_SESSION["gamenum"] = 1;
		$_SESSION["gsarray"] = array(0,0,0,0,0,0,0,0,0,0);
		echo $_SESSION["tops"];
	}
	elseif ($request == "New")
	{
		if ($_SESSION["oknewgame"] != 1)
		{
			exit;
		}
		else
		{
			$tmpscore = 0;
			if ($_SESSION["stepcnt"]<=3)
			{
				$tmpscore = 1000;
			}
			elseif ($_SESSION["stepcnt"] <= 13)
			{
				$tmpscore = 1000-$_SESSION["stepcnt"]*$_SESSION["stepcnt"]*$_SESSION["stepcnt"]/13;
			}
			elseif ($_SESSION["stepcnt"]<=20)
			{
				$tmpscore = 700-$_SESSION["stepcnt"]*$_SESSION["stepcnt"];
			}
			elseif ($_SESSION["stepcnt"]<=42)
			{
				$tmpscore = 300-2*$_SESSION["stepcnt"];
			}
			elseif ($_SESSION["stepcnt"]<=214)
			{
				$tmpscore =216-$_SESSION["stepcnt"];
			}
			else $tmpscore = 1;
			$_SESSION["tops"]=30;
			$_SESSION["x"]=rand(0,29);
			$_SESSION["startx"] = $_SESSION["x"];
			$_SESSION["inc"]=rand(0,29);
			$_SESSION["stepcnt"] = 0;
			$_SESSION["oknewgame"] = 0;
			echo $tmpscore;
		}
	}
	elseif ($request == "Check")
	{
		$curguess = $_POST['num'];
		$_SESSION["stepcnt"] ++;
		if ($curguess == $_SESSION["x"])
		{
			echo ($_SESSION["startx"]*8 + $_SESSION["inc"]*2048);
			$_SESSION["oknewgame"] = 1;
			exit;
		}
		else if ($curguess < $_SESSION["x"])
		{
			echo 1;
		}
		else echo 2;
		$_SESSION["x"] += $_SESSION["inc"];
		$_SESSION["x"] %= $_SESSION["tops"];
	}


function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}

?>