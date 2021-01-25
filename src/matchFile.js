const config = require('config');

const rawIgnorePatterns = config.get('ignorePatterns');
const ignoreRegExes = rawIgnorePatterns.map(pattern => new RegExp(pattern));
const rawFileTypes = config.get('fileTypes');
const matchingFileRegExes = rawFileTypes.map(pattern => new RegExp(`.*\\.${pattern}$`))

const matchFile = (path) => {
  let decision = true;
  for(let i = 0; i < ignoreRegExes.length && decision; i++) {
    const regex = ignoreRegExes[i];
    decision = !regex.test(path);
  }
  if(!decision) {
    return false;
  }
  decision = false;
  for(matchingFileType of matchingFileRegExes) {
    if(matchingFileType.test(path)) {
      return true;
    }
  }
  return decision;
}

exports.matchFile = matchFile;
