/*
 * Project:
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

// IOhandler.unzip(zipFilePath, pathUnzipped);
pngFiles = IOhandler.readDir(pathUnzipped);
console.log(typeof (pngFiles));
pngFiles.forEach(image => {
  IOhandler.grayScale(image, pathProcessed);
})