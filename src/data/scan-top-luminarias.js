const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../public/top luminarias');

if (!fs.existsSync(srcDir)) {
  console.error("Directory not found:", srcDir);
  process.exit(1);
}

const folders = fs.readdirSync(srcDir).filter(name => {
  return fs.statSync(path.join(srcDir, name)).isDirectory();
});

const report = {};

for (const folder of folders) {
  const fullPath = path.join(srcDir, folder);
  
  // Recursively find all files
  const files = [];
  function scan(dir) {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      const p = path.join(dir, item);
      if (fs.statSync(p).isDirectory()) {
        scan(p);
      } else {
        files.push(path.relative(fullPath, p));
      }
    }
  }
  scan(fullPath);
  
  report[folder] = {
    images: files.filter(f => /\.(webp|png|jpg|jpeg|gif)$/i.test(f)),
    stls: files.filter(f => /\.stl$/i.test(f)),
    threemfs: files.filter(f => /\.3mf$/i.test(f)),
    others: files.filter(f => !/\.(webp|png|jpg|jpeg|gif|stl|3mf)$/i.test(f))
  };
}

fs.writeFileSync(
  path.join(__dirname, 'scan-report.json'),
  JSON.stringify(report, null, 2),
  'utf-8'
);

console.log("Scan completed! Report written to scan-report.json");
