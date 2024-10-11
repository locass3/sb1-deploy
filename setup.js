const degit = require('degit');

const repoUrl = 'github:username/repo-name'; // Replace with the actual GitHub repo URL

console.log('Cloning repository...');

degit(repoUrl, { force: true })
  .clone('.')
  .then(() => {
    console.log('Repository cloned successfully!');
    console.log('Installing dependencies...');
    require('child_process').execSync('npm install', { stdio: 'inherit' });
    console.log('Setup complete! You can now run your project.');
  })
  .catch((err) => {
    console.error('Error:', err);
  });