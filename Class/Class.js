
const levelProgress = document.querySelector('.level_progress');
let time = 0;
const container = document.querySelector('.container');
const mask = document.querySelector('.mask');
const bar_1 = document.querySelector('.progress_1 .bar');
const bar_2 = document.querySelector('.progress_2 .bar');
const bar_3 = document.querySelector('.progress_3 .bar');
const bar_4 = document.querySelector('.progress_4 .bar');
const bar_5 = document.querySelector('.progress_5 .bar');
const levelBall_1 = document.querySelector('.level_1');
const levelBall_2 = document.querySelector('.level_2');
const levelBall_3 = document.querySelector('.level_3');
const levelBall_4 = document.querySelector('.level_4');
const levelBall_5 = document.querySelector('.level_5');

const l2p = 200;
const l3p = 350;
const l4p = 500;
const l5p = 775;
const l6p = 2000;

const la1a = 0.95;
const la2a = 0.75;
const la3a = 0.15;
const la4a = 0;
const la5a = 0;
const la1b = 0.5;
const la2b = 0.25;
const la3b = 0.7;
const la4b = 0.3;
const la5b = 0.05;

const sa1b = 0.9;
const sa2b = 0.5;
const sa3b = 0.05;

const la1s = 18;
const la2s = 15;
const la3s = 12;
const la4s = 9;
const la5s = 5;

const sa1s = 9;
const sa2s = 7;
const sa3s = 3;

const catam = 120;

let level = 1;
let levelPoints = [0,0,0,0,0,0]; 

let ca = 0;

let l1a = 0;
let l2a = 0;
let l3a = 0;
let l4a = 0;
let l5a = 0;
let s1a = 0;
let s2a = 0;
let s3a = 0;

tween();
//tick(time);

function l1()
{
		l1a ++;
		update();
}

function l2()
{
		if (l1a > 0) l1a --;
		update();
}

function l3()
{
		l2a ++;
		update();
}

function l4()
{
		if (l2a > 0) l2a --;
		update();
}

function l5()
{
		l3a ++;
		update();
}

function l6()
{
		if (l3a > 0) l3a --;
		update();
}

function l7()
{
		l4a ++;
		update();
}

function l8()
{
		if (l4a > 0) l4a --;
		update();
}

function l9()
{
		l5a ++;
		update();
}

function l10()
{
		if (l5a > 0) l5a --;
		update();
}

function l11()
{
		s1a ++;
		update();
}

function l12()
{
		if (s1a > 0) s1a --;
		update();
}

function l13()
{
		s2a ++;
		update();
}

function l14()
{
		if (s2a > 0) s2a --;
		update();
}

function l15()
{
		s3a ++;
		update();
}

function l16()
{
		if (s3a > 0) s3a --;
		update();
}

function l17()
{
		ca = 1;
		update();
}

function l18()
{
		ca = 0;
		update();
}

function l19()
{
		l1a = 0;
		l2a = 0;
		l3a = 0;
		l4a = 0;
		l5a = 0;
		s1a = 0;
		s2a = 0;
		s3a = 0;
		ca = 0;
		update();
}

function l20()
{
	let a = l1a*la1a+l2a*la2a+l3a*la3a+l4a*la4a+l5a*la5a;
	let b = l1a*la1b+l2a*la2b+l3a*la3b+l4a*la4b+l5a*la5b+s1a*sa1b+s2a*sa2b+s3a*sa3b;
	let r = l1a*la1s+l2a*la2s+l3a*la3s+l4a*la4s+l5a*la5s+s1a*sa1s+s2a*sa2s+s3a*sa3s;
	let m2 = a*15+b*5+r+ca*catam;
	if (a<=8) m1 = m2;
	else m1 = m2 + (a-8)*15;
	if (m1 >= (l5p+l6p)/2)
	{
		window.alert("你的成绩已经远远超过first了，前10应该挺稳...");
	}
	else
	if (m1 >= l5p)
	{
		window.alert("你的成绩已经达到first了，要不考虑一下最后一张paper不去了？");
	}
	else
	if (m2 < l2p)
	{
		alertmessage = "距离3/2.2/2.1/1还需"+((l2p-m2)/35).toFixed(2)+"/"+((l3p-m2)/35).toFixed(2)+"/"+((l4p-m2)/35).toFixed(2)+"/"+((l5p-m1)/48).toFixed(2)+"个alpha。一个beta约等于0.45/0.3个alpha(对2.1及以下/first而言)。";
		window.alert(alertmessage);
	}
	else if (m2<l3p)
	{
		alertmessage = "距离2.2/2.1/1还需"+((l3p-m2)/35).toFixed(2)+"/"+((l4p-m2)/35).toFixed(2)+"/"+((l5p-m1)/48).toFixed(2)+"个alpha。一个beta约等于0.45/0.3个alpha(对2.1及以下/first而言)。";
		window.alert(alertmessage);
	}
	else if (m2<l4p)
	{
		alertmessage = "距离2.1/1还需"+((l4p-m2)/35).toFixed(2)+"/"+((l5p-m1)/48).toFixed(2)+"个alpha。一个beta约等于0.45/0.3个alpha(对2.1及以下/first而言)。";
		window.alert(alertmessage);
	}
	else
	{
		alertmessage = "距离1还需"+"/"+((l5p-m1)/48).toFixed(2)+"个alpha。一个beta约等于0.3个alpha。";
		window.alert(alertmessage);
	}
}

function tween() {
	TweenLite.to(bar_1, 0.5, {width: (levelPoints[0] * 100).toString() + '%', ease:Expo.easeInOut});
	TweenLite.to(bar_2, 0.5, {width: (levelPoints[1] * 100).toString() + '%', ease:Expo.easeInOut});
	TweenLite.to(bar_3, 0.5, {width: (levelPoints[2] * 100).toString() + '%', ease:Expo.easeInOut});
	TweenLite.to(bar_4, 0.5, {width: (levelPoints[3] * 100).toString() + '%', ease:Expo.easeInOut});
	TweenLite.to(bar_5, 0.5, {width: (levelPoints[4] * 100).toString() + '%', ease:Expo.easeInOut});
	TweenLite.to(levelProgress, 1, {left:(45 - 20*(level-1)).toString() +'%', ease:Expo.easeInOut});
		
	if (level === 1){
		TweenLite.to(container, 1, {className:"container", ease:Bounce.easeOut});			
		TweenLite.to(mask, 1, {className:"mask", ease:Bounce.easeOut});
		TweenLite.to(levelProgress, .5,{left:'35%',scale:1.2, ease:Power1.easeInOut});
		TweenLite.to(levelBall_2, 0.5, {className:'-=level_reached', scale:1});
		TweenLite.to(levelBall_3, 0.5, {className:'-=level_reached', scale:1});
		TweenLite.to(levelBall_4, 0.5, {className:'-=level_reached', scale:1});
		TweenLite.to(levelBall_5, 0.5, {className:'-=level_reached', scale:1});
		TweenLite.to(levelBall_1, 0.7, {className:'+=level_reached', scale:1.3, ease: Bounce.easeOut, delay:.8});
	}
	if (level >=2) {
		TweenLite.to(container, 1, {className:"container level_2c", ease:Bounce.easeOut, delay: 0.8 });
		TweenLite.to(mask, 1, {className:"mask level_2c", ease:Bounce.easeOut, delay: 0.8 });
		TweenLite.to(levelBall_2, 0.7, {className:'+=level_reached', scale:1.3, ease: Bounce.easeOut, delay:.8});
	}
	if (level >=3) {
		TweenLite.to(container, 1, {className:"container level_3c", ease:Bounce.easeOut, delay: 0.8 });
		TweenLite.to(mask, 1, {className:"mask level_3c", ease:Bounce.easeOut, delay: 0.8 });
		TweenLite.to(levelBall_3, 0.7, {className:'+=level_reached', scale:1.3, ease: Bounce.easeOut, delay:.8});
	}
	if (level >=4) {
		TweenLite.to(container, 1, {className:"container level_4c", ease:Bounce.easeOut, delay: 0.8 });
		TweenLite.to(mask, 1, {className:"mask level_4c", ease:Bounce.easeOut, delay: 0.8 });
		TweenLite.to(levelBall_4, 0.7, {className:'+=level_reached', scale:1.3, ease: Bounce.easeOut, delay:.8});
	}
	if (level >=5) {
		TweenLite.to(container, 1, {className:"container level_5c", ease:Bounce.easeOut, delay: 0.8 });
		TweenLite.to(mask, 1, {className:"mask level_5c", ease:Bounce.easeOut, delay: 0.8 });
		TweenLite.to(levelBall_5, 0.7, {className:'+=level_reached', scale:1.3, ease: Bounce.easeOut, delay:.8});
	}
}

function update()
{
	let a = l1a*la1a+l2a*la2a+l3a*la3a+l4a*la4a+l5a*la5a;
	let b = l1a*la1b+l2a*la2b+l3a*la3b+l4a*la4b+l5a*la5b+s1a*sa1b+s2a*sa2b+s3a*sa3b;
	let r = l1a*la1s+l2a*la2s+l3a*la3s+l4a*la4s+l5a*la5s+s1a*sa1s+s2a*sa2s+s3a*sa3s;
	let m2 = a*15+b*5+r+ca*catam;
	if (a<=8) m1 = m2;
	else m1 = m2 + (a-8)*15;
	document.getElementById("l1a_text").innerHTML="("+l1a+")";
	document.getElementById("l2a_text").innerHTML="("+l2a+")";
	document.getElementById("l3a_text").innerHTML="("+l3a+")";
	document.getElementById("l4a_text").innerHTML="("+l4a+")";
	document.getElementById("l5a_text").innerHTML="("+l5a+")";
	document.getElementById("s1a_text").innerHTML="("+s1a+")";
	document.getElementById("s2a_text").innerHTML="("+s2a+")";
	document.getElementById("s3a_text").innerHTML="("+s3a+")";
	if (m1 >= l5p)
	{
		level = 5;
		levelPoints = [1,1,1,1,0,0];
		levelPoints[4] = (m1-l5p)/(l6p-l5p);
		if (levelPoints[4]>1) levelPoints[4] = 1;
	}
	else
	if (m2 < l2p)
	{
			level = 1;
			levelPoints = [0,0,0,0,0,0];
			levelPoints[0] = m2/l2p;
	}
	else if (m2<l3p)
	{
			level = 2;
			levelPoints = [1,0,0,0,0,0];
			levelPoints[1] = (m2-l2p)/(l3p-l2p);
	}
	else if (m2<l4p)
	{
			level = 3;
			levelPoints = [1,1,0,0,0,0];
			levelPoints[2] = (m2-l3p)/(l4p-l3p);
	}
	else
	{
			level = 4;
			levelPoints = [1,1,1,0,0,0];
			levelPoints[3] = (m1-l4p)/(l5p-l4p);
	}
	document.getElementById("test").innerHTML = "预测 M1/M2:"+m1+"/"+m2;
	tween();
}

/*
function tick() {
	time++;
	if (time%2 === 0) {
		update(time);
	}
	TweenLite.delayedCall(1, tick);
}

function update(time) {
	const rndPoints = 	Math.round(Math.random()*(level-1))+1;
	if (level === 5) {
		level = 1;
		levelPoints = [0,0,0,0,0,0];
	} else {
		levelPoints[level-1] = 
			Math.min(levelPoints[level-1] + rndPoints, level*3);
	}
	if (levelPoints[level-1] >= 3*level ) {
		level += 1;	
	} 
	tween();	
}
*/
