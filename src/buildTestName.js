const fs = require('fs');
const path = require('path');

const buildTestName = (fileName) => {
  const ext = path.extname(fileName);
  const name = fileName.replace(ext, '');
  return `${name}.test${ext}`;
};

exports.buildTestName = buildTestName;
