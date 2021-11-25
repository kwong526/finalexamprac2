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

const unzipFiles = async () => {
  await IOhandler.unzip(zipFilePath, pathUnzipped);
};
unzipFiles()
  .then(async () => await IOhandler.readDir(pathUnzipped))
  .then(async (images) => {
    // console.log(images)

    await images.forEach((image) => {
      let id = Math.round(Math.random() * 2000);
      IOhandler.grayScale(image, `${pathProcessed}/${id}.png`)
    });
  })
  .catch((err) => console.log(err));


// pngFiles.then((images) => {
//   images.forEach((png) => {
//     IOhandler.grayScale(png, pathProcessed);
//   })
// });