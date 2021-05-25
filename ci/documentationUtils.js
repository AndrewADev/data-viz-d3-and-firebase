const { promises: fsAsync, existsSync } = require('fs');
const path = require('path');

const looksSame = require('looks-same');

const fileNames = [
  'preview-hierarchy-example.png',
  'preview-project-one.png',
  'preview-project-two.png',
  'preview-project-three.png'
];

const moveFiles = async (oldLocation, newLocation) => {
  fileNames.forEach(async fileName => {
    const oldFull = path.join(oldLocation, fileName);
    const newFull = path.join(newLocation, fileName);
    if (existsSync(oldFull)) {
      looksSame(oldFull, newFull, { tolerance: 5 }, async (err, equal = {}) => {
        if (err) {
          console.error('Error running comparison:', err);
        }
        if (equal) {
          console.info(
            `The file ${fileName} does not appear to have changed. It has not been moved`
          );
        } else {
          await fsAsync.rename(oldFull, newFull);
          console.info(`The file ${fileName} has been updated`);
        }
      });
    } else {
      console.error(
        `The file ${fileName} was not generated, and cannot be compared`
      );
    }
  });
};

module.exports = {
  moveFiles
};
