<?php
session_start();
?>
<html>
<head>
		<title>xr211</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="../../assets/css/main.css" />
		<!--[if lte IE 9]><link rel="stylesheet" href="assets/css/ie9.css" /><![endif]-->
		<noscript><link rel="stylesheet" href="../../assets/css/noscript.css" /></noscript>
		<link rel="shortcut icon" href="../../favicon.ico?" />
		<script src="../../assets/js/jquery.min.js"></script>
	</head>
<body>

<h1 class="major">Challenge: Number Guessing</h1>

<table style="width:100%">
	<tr> <th>Game Number</th> <th>Total Score</th></tr>
	<tr> <td id="gamenum">0</td> <td id="totalscore">0</td></tr>
</table>

<p id="currentguess"></p>

<input type="button" onclick="increase5()" value="+5"/> 
<input type="button" onclick="increase1()" value="+1"/>
<input type="button" onclick="decrease1()" value="-1"/>
<input type="button" onclick="decrease5()" value="-5"/>
<input type="button" id="makeguess" value="Guess!"/>

<p id="GuessHistory"></p>

<input type="button" id="buttonnewgame" value="Next Game"/>
<input type="button" id="viewresults" onclick="location.href='Guess_Ranklist.php';" value="View Results"/>

<script>

curguess = 0;
stepcnt = 0;
GuessHist = "";
tops = 20;
gamenum = 0;
totalscore = 0;

$(document).ready(function()
{
	$.post("GuessNum_serv.php",
	{
		request: "Init"
	},
	function(data)
	{
		curguess = 0;
		stepcnt = 0;
		GuessHist = "";
		tops = data%256;
		gamenum = 1;
		document.getElementById("currentguess").innerHTML = "Your guess: " + curguess;
		document.getElementById("GuessHistory").innerHTML = GuessHist;
		document.getElementById("gamenum").innerHTML = gamenum;
		$("#buttonnewgame").hide();
		$("#viewresults").hide();
	});
});

$("#buttonnewgame").click(function()
{
	$.post("GuessNum_serv.php",
	{
		request: "New"
	},
	function(data)
	{
		curguess = 0;
		stepcnt = 0;
		GuessHist = "";
		document.getElementById("currentguess").innerHTML = "Your guess: " + curguess;
		document.getElementById("GuessHistory").innerHTML = GuessHist;
		$("#makeguess").show();
		gamenum ++;
		totalscore += Number(data);
		alert(totalscore);
		document.getElementById("gamenum").innerHTML = gamenum;
		document.getElementById("totalscore").innerHTML = totalscore.toFixed(3);
		$("#buttonnewgame").hide();
	});
});

$("#makeguess").click(function()
{
	$.post("GuessNum_serv.php",
	{
		request: "Check",
		num: curguess
	},
	function(data)
	{
		stepcnt ++;
		if (data % 8 == 1)
		{
			GuessHist = "Guess "+stepcnt+": "+curguess+", <span style=\"color:#00ff00\">too low</span><br>" + GuessHist;
		}
		else if (data % 8 == 2)
		{
			GuessHist = "Guess "+stepcnt+": "+curguess+", <span style=\"color:#ff0000\">too high</span><br>" + GuessHist;
		}
		else if (data % 8 == 0)
		{
			GuessHist = "Guess "+stepcnt+": "+curguess+", <span style=\"color:#00ffff\">correct!</span>"+ " Original="+((data>>3)&0xFF)+",increment="+((data>>11)&0xFF)+".<br>" + GuessHist;
			alert("You got it! You used "+stepcnt+" guess(es).");
			$("#makeguess").hide();
			if (gamenum == 10)
			{
				$("#viewresults").show();
			}
			else $("#buttonnewgame").show();
		}
		document.getElementById("GuessHistory").innerHTML=GuessHist;
	});
});

function increase5()
{
	curguess += 5;
	curguess %= tops;
	document.getElementById("currentguess").innerHTML = "Your guess: " + curguess;
}
function increase1()
{
	curguess ++;
	curguess %= tops;
	document.getElementById("currentguess").innerHTML = "Your guess: " + curguess;
}
function decrease1()
{
	curguess += tops-1;
	curguess %= tops;
	document.getElementById("currentguess").innerHTML = "Your guess: " + curguess;
}
function decrease5()
{
	curguess += tops-5;
	curguess %= tops;
	document.getElementById("currentguess").innerHTML = "Your guess: " + curguess;
}
</script>

</body>
</html>