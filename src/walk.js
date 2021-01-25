const fs = require('fs');
const path = require('path');

async function* walk(directory) {
  for await (const record of await fs.promises.opendir(directory)) {
    const absoluteRecord = path.join(directory, record.name);
    if (record.isDirectory()) yield* await walk(absoluteRecord);
    else if (record.isFile()) yield absoluteRecord;
  }
}

exports.walk = walk;
