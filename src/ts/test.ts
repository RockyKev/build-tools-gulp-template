interface Content {
  status: string;
}

const tsContent: Content = {
  status: "Everything",
};

const tsElement = document.querySelector<HTMLElement>("#ts")

console.log(tsElement);

const tsImage = tsElement.querySelector<HTMLImageElement>('img')
const tsParagraph = tsElement.querySelector<HTMLElement>("p")

tsImage.src = 'https://i.imgur.com/hJ8ua9B.jpeg';
tsParagraph.textContent = `${tsContent['status']} is Working!`

