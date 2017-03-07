// Ignacio Bricchi

//set variables
var visit=localStorage.getItem("visit");
var time=0;
var score=0;
var targetnum=0;
var targetnumbi=0;
var result;
var clicknum=0;
var highscore=0;
if (visit==1) {
	highscore=localStorage.getItem("highscore");
}
visit=1;
localStorage.setItem("visit", visit);

//random function
function rand(a, b){
    return~~ (Math.random() * b) + a;
}

//timer functions
setInterval(function(){
	time--;
}, 1000)

function timer() {
    $("#timerbar").clearQueue().stop().css("width","100%").animate({width:"0"}, time*1000, "linear");
    var timeseq = setInterval(function(){
    	$("#time").text("Time: "+time);
    	if (time==0) {
    		clearInterval(timeseq);
    		return;
    	}
    }, 1000)
}

//first setup function
function start(q){
	if (q==0) {
		score=0;
	}
    targetnum=rand(1, 25);
    if (targetnum<10){
    	time=5;
    }else{
    	time=targetnum;
    }
	timer();
    $("#time").text("Time: "+ time);
    $("#score").text("Score: "+ score);
    $("#targetnum").text(targetnum).css("font-size", "18vh");
    $("#result p").text("l").css("color", "blue");
    result="";
    targetnumbi=binary(targetnum);
}

//meun function
function menu() {
	$("body").append('<div id="menufloat"><h1>Menu</h1><ul><li>Min Number <input type="text"></li><li>Max Number <input type="text"></li><li>Min Time <input type="text"></li></ul><div>')
}

//make numbers add number
function add(c){
	if (time==0) {
		return;
	}
	if (result==undefined) {
		result=c;
		result=result.toString();
	}else{
		result=result+c;
	}
	$("#result p").css("color", "black").text(result);
}

//backspace
function backres() {
	if (time==0) {
		return;
	}
	if (result.length==1||result.length==0) {
		$("#result p").text("l").css("color", "blue");
		result = result.substring(0, result.length - 1);
	}else{
		result = result.substring(0, result.length - 1);
		$("#result p").text(result);
	}
}

//change num to binary
function binary(d){
    return (d >>> 0).toString(2);
}

//compare result to target
function compare(){
	if(targetnumbi==$("#result p").text()){
		score++;
		start(1);
	}
}
setInterval(compare,50);

//highscore
function checkhighscore(){
	if (score>highscore) {
		highscore=score;
		localStorage.setItem("highscore", highscore);
	}
}

//restart
function restart() {
	checkhighscore()
	time=0;
	score=0;
	targetnum=0;
	targetnumbi=0;
	result;
	clicknum=0;
	$("#time").text("Time: ");
    $("#score").text("Score: ");
    $("#targetnum").text("start").css("font-size", "18vh");
    $("#result p").text("filler Text").css("color", "black");
}

//time runs out
function fail() {
	if (time==0) {
		restart();
		$("#timerbar").clearQueue().stop().css("width","100%");
	}
}
solucion
setInterval(fail, 50);