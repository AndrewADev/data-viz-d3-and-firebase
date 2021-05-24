const fs = require("fs").promises;
const path = require("path");

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
    await fs.rename(oldFull, newFull);
  });
};

module.exports = {
  moveFiles
};
