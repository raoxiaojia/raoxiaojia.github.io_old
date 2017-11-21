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
<h2>Rules</h2>
<p>A random integer in [0,29] will be generated at the beginning of each game.</p>
<p>In one turn, you may guess any integer in [0,29]. If you guess the number correctly then the game ends; otherwise you will know if your guess was greater than or lower than the random number.</p>
<p>After each of your guess, the random integer will be increased by a random predetermined constant increment in [0,29], with result mod 30. So now you have to guess the new number!</p>

<h2>Challenge</h2>
<h3>Level 1</h3>
<p>Find a strategy that always succeeds within 42 steps.</p>
<h3>Level 2</h3>
<p>Find a strategy that always succeeds within 20 steps.</p>
<h3>Level 3</h3>
<p>Find a strategy that always succeeds within 13 steps.</p>

<h2>Scoring</h2>
<p>You will play a sequence of <span style=\"color:#00ff00\"> 10</span> games for minimizing randomness.</p>
<p>For each game you will receive a score as below. Basically the scoring table is designed in a way that could distinguish players that completed different level of challenges.</p>

<table style="width:100%">
	<tr> <th>Guesses=n</th> <th>Score</th> </tr>
	<tr> <td>3 or fewer</td> <td>1000</td> </tr>
	<tr> <td>[4,13]</td> <td>1000-n<sup>3</sup>/13</td> </tr>
	<tr> <td>[14,20]</td> <td>700-n<sup>2</sup></td> </tr>
	<tr> <td>[21,42]</td> <td>300-2n</td> </tr>
	<tr> <td>[43,214]</td> <td>216-n</td> </tr>
	<tr> <td>215 or more</td> <td>1</td> </tr>
</table>

<p>Your final score will be the sum of your scores for the 10 games.

<p>Click the button below to start your challenge.</p>

<button type="button" onclick="location.href='GuessNum_Challenge.php';">Start</button>

</body>
</html>