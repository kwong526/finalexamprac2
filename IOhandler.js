/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  fsP = require("fs").promises,
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .pipe(unzipper.Parse())
    .promise()
    .then(() => console.log("Extracted"))
    .catch((err) => console.log(err));
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = async (dir) => {
  if (fs.existsSync(dir)) {
    let files = await fsP.readdir(dir);
    let images = [];

    files.forEach((file) => {
      images.push(path.join(dir, file));
    });

    return images.filter((image) => image.includes(".png"));

  } else {
    throw new Error("Directory does not exist");
  }
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (filePath, pathProcessed) => {
  fs.createReadStream(filePath)
    .pipe(new PNG())
    .on("parsed", function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;

          // gray colour
          let gray = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
          // invert color
          this.data[idx] = gray; // R
          this.data[idx + 1] = gray; // G
          this.data[idx + 2] = gray; // B

          // and reduce opacity
          // this.data[idx + 3] = this.data[idx + 3] >> 1;
        }
      }
      this.pack().pipe(fs.createWriteStream(pathProcessed));
    })
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
