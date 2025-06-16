const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Рекурсивно находим все .md файлы
function findMarkdownFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findMarkdownFiles(fullPath, files);
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Извлекаем данные из markdown файлов
function extractSearchData() {
  const contentDir = path.join(__dirname, '../content/docs');
  const mdFiles = findMarkdownFiles(contentDir);
  const searchData = [];
  
  for (const file of mdFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const { data, content: body } = matter(content);
    
    // Получаем относительный путь для slug
    const relativePath = path.relative(contentDir, file);
    const slug = relativePath
      .replace(/\.md$/, '')
      .replace(/\\/g, '/')
      .replace(/index$/, '');
    
    // Извлекаем заголовки из контента
    const headings = [];
    const headingRegex = /^#{1,3}\s+(.+)$/gm;
    let match;
    while ((match = headingRegex.exec(body)) !== null) {
      headings.push(match[1]);
    }
    
    searchData.push({
      title: data.title || path.basename(file, '.md'),
      slug: slug || 'index',
      description: data.description || '',
      headings: headings,
      content: body.slice(0, 500) // Первые 500 символов для поиска
    });
  }
  
  return searchData;
}

// Сохраняем данные
const searchData = extractSearchData();
const outputPath = path.join(__dirname, '../lib/searchData.json');

fs.writeFileSync(
  outputPath,
  JSON.stringify(searchData, null, 2)
);

console.log(`✅ Search index built: ${searchData.length} documents indexed`);
console.log(`📁 Output: ${outputPath}`); 