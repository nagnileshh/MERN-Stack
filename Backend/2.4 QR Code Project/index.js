/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import fs from "fs";
import qr from "qr-image"
import sharp from 'sharp'

inquirer
  .prompt([
    {message: "Enter your URL", name: "URL"},
    /* Pass your questions in here */
  ])
  .then((answers) => {
    
    fs.writeFile('file.txt', answers.URL, (err) => {
        if(err) {
            throw err;
            console.log("Data has been written to file successfully.");
        }
    })
    var qrImg = qr.image(answers.URL);
    qrImg.pipe(fs.createWriteStream('qr.png'));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
