let loFlexes = [];
let totalSeconds = 0;
let upcomingFlex = "";
let startAudio = new Audio("DDStart.mp3");
let endAudio = new Audio("RSEVictory.mp3");

function antiToAd() {
	const checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
	for (var i = 0; i < checkboxes.length; i++) {
		loFlexes.push(checkboxes[i].value)
	}
	anti.style.display="none";
	post.style.display="flex";
	nextBreak();
}

function postToAnti() {
	post.style.display="none";
	anti.style.display="block";
	document.documentElement.style.backgroundColor = "#222222";
}

function nextBreak() {
	if(totalTime.value * 60 - totalSeconds <= offTime.value) {
		postToAnti();
		return;
	}
	
	let setSeconds = 0;
	timer.innerHTML = offTime.value;
	upcomingFlex = loFlexes[Math.floor(Math.random() * loFlexes.length)];
	content.innerHTML = "Next Up: " + upcomingFlex;
	document.documentElement.style.backgroundColor = "#222233";
	const interval = setInterval(function() {
		setSeconds = setSeconds + 1;
		totalSeconds = totalSeconds + 1;

		timer.innerHTML = offTime.value - setSeconds;
		if(timer.innerHTML == 4) {
			startAudio.play();
		}

		if(setSeconds >= offTime.value) {
			clearInterval(interval);
			nextFlex();
		}
		else if(totalSeconds >= totalTime.value * 60) {
			clearInterval(interval);
			postToAnti();
		}
	}, 1000);
}

function nextFlex() {
	let setSeconds = 0;
	timer.innerHTML = onTime.value;
	content.innerHTML = upcomingFlex;
	document.documentElement.style.backgroundColor = "#332222";
	const interval = setInterval(function() {
		setSeconds = setSeconds + 1;
		totalSeconds = totalSeconds + 1;
		
		timer.innerHTML = onTime.value - setSeconds;
		if(timer.innerHTML == 1) {
			endAudio.play();
		}

		if(setSeconds >= onTime.value) {
			clearInterval(interval);
			nextBreak();
		}
		else if(totalSeconds >= totalTime.value * 60) {
			clearInterval(interval);
			postToAnti();
		}
	}, 1000);
}