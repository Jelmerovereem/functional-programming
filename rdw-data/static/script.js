fetch('https://opendata.rdw.nl/resource/adw6-9hsg.json?$$app_token=zI34snM8XBhNRzxL50vrTeOLA')
.then(response => response.json())
.then((data) => {
	console.log(data);
	data.forEach((dataObject) => {
		document.querySelector("body").insertAdjacentHTML("afterbegin", `<span>${dataObject.usageid}</span>`)
	})
});

// tried the following code aswell
getData("https://opendata.rdw.nl/resource/du2g-p9cu.json?$$app_token=zI34snM8XBhNRzxL50vrTeOLA");

async function getData(url) {
	const response = await fetch(url);

	const data = await response.json();

	console.log(data);
}