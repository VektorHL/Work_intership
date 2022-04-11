const execSync = require('child_process').execSync;
const gitCommandHead = 'git rev-parse HEAD';
const gitCommandShortHead = 'git rev-parse --short=11 FETCH_HEAD';

function getGitHashCommitShort() {
  return execSync(gitCommandShortHead).toString().trim();
}

function getGitHashCommitFull() {
  return execSync(gitCommandHead).toString().trim();
}

module.exports = {
  getGitHashCommitFull,
  getGitHashCommitShort,
};
