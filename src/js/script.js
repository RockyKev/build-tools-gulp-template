
const jsElement = document.querySelector('#js');

// get image
// get header
// get description

const jsImage = jsElement.querySelector("img")
const jsHeader = jsElement.querySelector("h2")
const jsContent = jsElement.querySelector("p")

jsImage.src = 'https://i.imgur.com/EkXd1Hl.jpeg';
jsContent.innerText = "Everything is working!";
