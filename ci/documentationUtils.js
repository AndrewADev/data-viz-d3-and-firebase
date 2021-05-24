const fs = require("fs").promises;
const path = require("path");

const looksSame = require("looks-same");

const fileNames = [
  "preview-hierarchy-example.png",
  "preview-project-one.png",
  "preview-project-two.png",
  "preview-project-three.png"
];

const moveFiles = async (oldLocation, newLocation) => {
  fileNames.forEach(async fileName => {
    const oldFull = path.join(oldLocation, fileName);
    const newFull = path.join(newLocation, fileName);
    looksSame(oldFull, newFull, async (err, { equal } = {}) => {
      if (err) {
        console.error("Error running comparison:", err);
      }
      if (equal) {
        console.info(
          `The file ${fileName} does not appear to have changed. It has not been moved`
        );
      } else {
        await fs.rename(oldFull, newFull);
        console.info(`The file ${fileName} has been updated`);
      }
    });
  });
};

module.exports = {
  moveFiles
};
