
import { readFileSync } from 'fs';
import path from 'path';
import { marked } from 'marked';

export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;  
  content: string; 
}

export async function load({ params }: { params: { slug: string } }): Promise<PostData> {
  const { slug } = params;

  try {    
    const postPath = path.resolve('posts', `${slug}.svx`);
        
    const fileContent = readFileSync(postPath, 'utf-8');
    
    const { data: frontmatter, body: content } = extractFrontmatter(fileContent);
    
    const htmlContent = await marked(content);
    
    return {
      slug,
      ...frontmatter,
      content: htmlContent
    };
  } catch (error) {    
    throw new Error(`Post não encontrado: ${slug}`);
  }
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
