const path = require("path");
const documentationUtils = require("./documentationUtils");

const fullRoot = path.join(__dirname, "..");

const movePreviews = () => {
  documentationUtils.moveFiles(
    path.join(fullRoot, "cypress", "screenshots", "documentation.spec.js"),
    path.join(fullRoot, "src", "assets")
  );
};

movePreviews();
