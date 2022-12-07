import { initConsoleLogImg } from 'console-log-img';

// Run this once to initialize the library
initConsoleLogImg({
  // Optionally, disable image dimensions logging (enabled by default)
  printDimensions: true,
});


// Print an image from a URI, at original size
console.img('https://openclipart.org/image/800px/5661');

console.log("im here in library")
