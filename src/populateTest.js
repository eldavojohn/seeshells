const config = require('config');
const fs = require('fs');
const path = require('path');
const { renderFile } = require('template-file');

const templateApplication = config.get('templateApplication');

const populateTest = async (originalFileName, destinationTest) => {
  // bail if file exists, we don't want to clobber work!
  try {
    if(fs.existsSync(destinationTest)) {
      return;
    }
  } catch(e) {}
  const ext = path.extname(originalFileName);
  const basename = path.basename(originalFileName);
  let className = basename.replace(ext, '');
  if(className === 'index') {
    className = path.dirname(originalFileName).split(path.sep).pop();
  }
  const matchingKey = Object.keys(templateApplication).find(pattern => new RegExp(pattern).test(basename))
  const matchingTemplateLocation = templateApplication[matchingKey];
  const data = {
    "ClassComponent": className,
    "ClassComponentLocation": originalFileName
  };
  const string = await renderFile(matchingTemplateLocation, data);
  fs.writeFile(destinationTest, string, function (e) { });
  return;
};

exports.populateTest = populateTest;
