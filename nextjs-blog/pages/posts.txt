//This module provides functions to read and process markdown files from the 'posts' directory, extracting metadata and converting content to HTML for use in a Next.js blog application.
import fs from 'fs';

// The fs module allows interaction with the file system.
import path from 'path';

// The path module provides utilities for working with file and directory paths.
import matter from 'gray-matter';

// The gray-matter library is used to parse the metadata in markdown files.
import { remark } from 'remark';

// The remark library is used to convert markdown content into HTML.
import html from 'remark-html';
 
// Define the directory where markdown files are stored.
const postsDirectory = path.join(process.cwd(), 'posts');

// This defines the path to the 'posts' directory where markdown files are stored.
export function getSortedPostsData() {

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Returns an array of objects containing the ids of all posts for dynamic routing.
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
 
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// Fetches and processes the content of a specific post by its id, converting markdown to HTML and returning the data.
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
 
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

// Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };

 }
