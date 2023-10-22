import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";


/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: "input",
        name: "URL",
        message: "What website should be made into a qr code?"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL

    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    fs.writeFile('QrText.txt', url, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('File created');
});
})
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });