let loFlexes = [];
let rotatingloFlexes = [];
let totalSeconds = 0;
let upcomingFlex = "";

function addFlex(flexName) {
	if (newFlex.value) {
		let sanatizedName = newFlex.value.replace(/[^a-zA-Z0-9 ]+/g, "").substring(0, 11);
		let spaceless = sanatizedName.replace(" ", "");
		if (sanatizedName && spaceless) {
			let newDiv = `
				<div class=col>
					<input class="checkablebox" type="checkbox" checked=true id="` + sanatizedName + `" + value="` + sanatizedName + `">
					<label for="` + sanatizedName + `"> ` + sanatizedName + `</label><br>
				</div>
			`;
			checkables.innerHTML += newDiv;
			newFlex.value = "";
		}
		else {
			alert("" + newFlex.value + " is not valid, please enter atleast one alphanumeric character.")
		}
	}
}

function antiToAd() {
	const checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
	for (var i = 0; i < checkboxes.length; i++) {
		loFlexes.push(checkboxes[i].value);
	}
	rotatingloFlexes = [...loFlexes];
	if (rotatingloFlexes.length < 1) {
		alert("Please select at least one checkbox.");
		return;
	}
	totalSeconds = 0;
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
	
	let flexIndex = Math.floor(Math.random() * rotatingloFlexes.length);
	upcomingFlex = rotatingloFlexes[flexIndex];
	rotatingloFlexes.splice(flexIndex, 1);
	if (rotatingloFlexes.length < 1) {
		rotatingloFlexes = [...loFlexes];
	}

	let setSeconds = 0;
	timer.innerHTML = offTime.value;
	content.innerHTML = "Next Up: " + upcomingFlex;
	document.documentElement.style.backgroundColor = "#222233";
	const interval = setInterval(function() {
		setSeconds = setSeconds + 1;
		totalSeconds = totalSeconds + 1;

		timer.innerHTML = offTime.value - setSeconds;
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