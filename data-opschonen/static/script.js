// get the rdw data from data.js
var data = data();
data = data.data;

function convertToHex(eyeColor) {
	eyeColor = eyeColor.replace(".", ","); // remove all dots (for example: RGB(0.0.0) => RGB(0,0,0)) 
	eyeColor = eyeColor.replace(" ", ""); // remove all unwanted spaces (for example: # xxx => #xxx)

	eyeColor = eyeColor.toUpperCase(); // convert everything to uppercase for checks
	if (eyeColor === "BRUIN") { // if bruin, convert to hex code brown
		eyeColor = "#8A7444";
	} else if (eyeColor === "BLAUW") { //if blauw, convert to hex code blauw
		eyeColor = "#4266f5";
	} else if (eyeColor === "LICHTBLAUW") { // ^^
		eyeColor = "#61d9fa";
	} else if (eyeColor === "GROEN") { // ^^
		eyeColor = "#269600"
	}

	if (eyeColor[0] != "#" && eyeColor[0] != "R") { // if intend is a hex code but doesn't have # and if first letter isn't "R" for RGB(A)
		eyeColor = [eyeColor.slice(0, 0), "#", eyeColor.slice(0)].join("");
	}

	return eyeColor;
}

function calcAge(birthDate) {
	const dateParts = birthDate.split("-"); // create array with loose dd/mm/yyyy elements 

	const dateObject= new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); // format to mm/dd/yyyy

	const today = new Date();

	let age = today.getFullYear() - dateObject.getFullYear();
	const m = today.getMonth() - dateObject.getMonth();

	if (m < 0 || (m === 0 && today.getDate() < dateObject.getDate())) {
		age--;
	}

	return age;
}

data.forEach((student) => {
	// convert the student's eyecolor to hex codes
	student.oogKleur = convertToHex(student.oogKleur)

	const gbrt = student.geboortedatum;

	// calculate age from birth date
	const age = calcAge(gbrt);

	const html = `<div class="color-box" style="background-color: ${student.oogKleur};" title="${gbrt}"><span>Leeftijd: ${age}</span></div>`;
	document.querySelector(".container-boxes").insertAdjacentHTML("afterbegin", html);
});

data.forEach((student) => {
	// convert the student's eyecolor to hex codes
	student.oogKleur = convertToHex(student.oogKleur)

	const html = `<div class="eye-container"><div class="eye-inner-container"><div class="ownEye-outer"><div class="ownEye-inner" style="background-color: ${student.oogKleur};"><div class="inner-inner"></div></div></div><div class="ownEye-outer"><div class="ownEye-inner" style="background-color: ${student.oogKleur};"><div class="inner-inner"></div></div></div></div><span style="color: ${student.oogKleur};">${student.oogKleur}</span></div>`;
	document.querySelector(".container-eyes").insertAdjacentHTML("afterbegin", html);
});

document.querySelector(".toggleAnimation").addEventListener("click", () => {
	document.querySelectorAll(".ownEye-outer").forEach((eye) => {
		eye.classList.toggle("animationSqueeze");
	})

	document.querySelectorAll(".ownEye-inner").forEach((iris) => {
		iris.classList.toggle("animationMove");
	})
})


// cleaning the coordinates from the birthplace. Result: "52.228947, 5.230462" (lat,long)
data.forEach((student, index) => {
	let coordinate = student.geboorteplaats;

	// if entry is empty, set default coordinate
	if (coordinate === "") {
		coordinate = "0.0000000, 0.0000000";
	}

	//convert the dms coordinates to the wanted(lat, long) result
	if (coordinate.includes(`°`) && coordinate.includes(`"`)) {
		const coordinateSplitted = coordinate.split(" ");
		const dmsLat = coordinateSplitted[0];
		const dmsLng = coordinateSplitted[1];
		const latDeg = parseFloat(dmsLat.split("°")[0].replace(/"/g, ""));
		const latMin = (parseFloat(dmsLat.split("°")[1].split("'")[0])) / 60;
		const latSec = (parseFloat(dmsLat.split("°")[1].split("'")[1].split('"')[0])) / 3600;
		const lat = latDeg + latMin + latSec;

		const lngDeg = parseFloat(dmsLng.split("°")[0].replace(/"/g, ""));
		const lngMin = (parseFloat(dmsLng.split("°")[1].split("'")[0])) / 60;
		const lngSec = (parseFloat(dmsLng.split("°")[1].split("'")[1].split('"')[0])) / 3600;
		const long = lngDeg + lngMin + lngSec;

		coordinate = `${lat.toFixed(7)}, ${long.toFixed(7)}`; // lat, long
	}


	coordinate = coordinate.replace(/[ ()]/g, "");

	if (coordinate[10] === ".") {
		coordinate = `${coordinate.substring(0, 8)}, ${coordinate.substring(9)}`;
	} else if (coordinate[11] === ".") {
		coordinate = `${coordinate.substring(0, 9)}, ${coordinate.substring(10)}`;
	} else if (coordinate[12] === ".") {
		coordinate = `${coordinate.substring(0, 10)}, ${coordinate.substring(11)}`;
	}

	// if there's still a wrong coordinate, set it to the default
	if (/['"°NE()a-zA-Z]/.test(coordinate)) {
		coordinate = "0.0000000, 0.0000000";
	}

	console.log(coordinate);
})