const path = require('path');

const { walk } = require('./src/walk');
const { matchFile } = require('./src/matchFile');
const { ensurePeerDirectory } = require('./src/ensurePeerDirectory');
const { buildTestName } = require('./src/buildTestName');
const { populateTest } = require('./src/populateTest');

async function main() {
  const argDirectory = process.argv.slice(2).length ? process.argv.slice(2) : ".";
  for await (const absoluteFileName of walk(argDirectory.toString())) {
    if (matchFile(absoluteFileName)) {
      const testDirname = ensurePeerDirectory(absoluteFileName, '__tests__');
      const fileName = path.basename(absoluteFileName);
      const testFileName = buildTestName(fileName);
      populateTest(absoluteFileName, `${testDirname}${path.sep}${testFileName}`);
    }
  }
}
main()
