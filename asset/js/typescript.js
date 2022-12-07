var tsContent = {
    status: "Everything"
};
var tsElement = document.querySelector("#ts");
console.log(tsElement);
var tsImage = tsElement.querySelector('img');
var tsParagraph = tsElement.querySelector("p");
tsImage.src = 'https://i.imgur.com/hJ8ua9B.jpeg';
tsParagraph.textContent = "".concat(tsContent['status'], " is Working!");
