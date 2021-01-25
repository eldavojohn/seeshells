const fs = require('fs');
const path = require('path');

const ensurePeerDirectory = (absoluteFileName, newDirectory) => {
  const fileLocation = path.dirname(absoluteFileName);
  const newDir = `${fileLocation}${path.sep}${newDirectory}`;
  try {
    fs.mkdirSync(newDir);
  } catch (e) {
    // do nothing if it exists
    return newDir;
  }
  return newDir;
};

exports.ensurePeerDirectory = ensurePeerDirectory;
