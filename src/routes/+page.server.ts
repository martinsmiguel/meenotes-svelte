import { glob } from 'glob';
import { readFileSync } from 'fs';
import path from 'path';

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

function extractFrontmatter(content: string) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatter = match ? match[1] : '';
  const body = match ? content.slice(match[0].length) : content;

  const data = frontmatter.split('\n').reduce((acc: any, line: string) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      acc[key.trim()] = valueParts.join(':').trim().replace(/['"]/g, '');
    }
    return acc;
  }, {});

  return { data, body };
}

export async function load(): Promise<{ posts: Post[] }> {
  const postFiles = glob.sync('posts/*.svx');

  const posts: Post[] = postFiles.map((filePath: string) => {
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = extractFrontmatter(fileContent);

    return {
      slug: path.basename(filePath, '.svx'),
      ...frontmatter
    };
  });

  return {
    posts
  };
}
