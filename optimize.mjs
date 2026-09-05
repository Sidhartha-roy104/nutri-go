import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  let totalSizeBefore = 0;
  let totalSizeAfter = 0;

  for (const file of files) {
    if (!file.match(/\.(png|jpe?g|JPG|JPEG)$/)) continue;
    
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    totalSizeBefore += stats.size;
    
    const parsed = path.parse(file);
    const outputName = parsed.name + '.webp';
    const outputPath = path.join(dirPath, outputName);
    
    const isHero = file.includes('Gym protein') || file.includes('Insta');
    const isLogo = file.includes('323');
    
    let sizeLimit = 900;
    if (isHero) sizeLimit = 1600;
    if (isLogo) sizeLimit = 256;

    try {
      await sharp(filePath)
        .resize({ width: sizeLimit, height: sizeLimit, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      const newStats = fs.statSync(outputPath);
      totalSizeAfter += newStats.size;
      
      console.log(`Optimized ${dirPath}/${file}: ${(stats.size/1024/1024).toFixed(2)}MB -> ${(newStats.size/1024).toFixed(2)}KB`);
      
      fs.unlinkSync(filePath);
    } catch (e) {
      console.error(`Failed to optimize ${file}`, e);
    }
  }
  
  console.log(`\nTotal size for ${dirPath}: ${(totalSizeBefore/1024/1024).toFixed(2)}MB -> ${(totalSizeAfter/1024/1024).toFixed(2)}MB`);
}

async function run() {
  await optimizeDir(path.join(__dirname, 'public', 'assets'));
  await optimizeDir(path.join(__dirname, 'assets'));
}
run();
