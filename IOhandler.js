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
  fs.createReadStream(pathIn)
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
const readDir = (dir) => {
  pngFiles = [];
  fsP.readdir(dir)
    .then((files) => {
      files.forEach((file) => {
        if (file.endsWith(".png")) {
          pngFiles.push(path.join(dir, file));
        }
      })
    })
    .then(() => console.log("Read Directory Success" + pngFiles))
    .catch((err) => console.log(err));
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  fs.createReadStream("in.png")
    .pipe(
      new PNG()
    )
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

      this.pack().pipe(fs.createWriteStream("out.png"));
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
