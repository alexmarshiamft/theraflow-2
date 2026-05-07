const { spawn } = require('child_process');

const nextDev = spawn('npx', ['next', 'dev', '-p', '0']);

nextDev.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

nextDev.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

nextDev.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
