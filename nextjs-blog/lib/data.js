// This module provides functions to read and process markdown files from the 'posts' directory, extracting metadata and converting content to HTML for use in a Next.js blog application.
// import fs from 'fs';

// The fs module allows interaction with the file system.
// import path from 'path';

// BEFORE USING got MUST DO: npm install got@9.6.0
import got from 'got';

const dataURL = "https://dev-srjc-fall-2025.pantheonsite.io/wp-json/twentytwentyone-child/v1/special";

 
// Define the directory where markdown files are stored.
// const postsDirectory = path.join(process.cwd(), 'posts');

// This defines the path to the 'posts' directory where markdown files are stored.
export async function getAllIds() {

  // Get file names under /posts
  
  // const filePath = path.join(dataDir, 'data.json');
    
    // const jsonString = fs.readFileSync(filePath, 'utf8');

    let jsonString;
    try {
      // next line ususes got synchronously to retrive via https our json data from wp site
      jsonString = await got(dataURL);
      // console.log(jsonString.body);
    } catch (error) {
      jsonString.boy = [];
      console.log(error);
    }


    // const jsonObj = JSON.parse(jsonString);

    const jsonObj = JSON.parse(jsonString.body);

    return jsonObj.map(item => {
      return {
        params: {
          id: item.ID.toString()
        }
      }
    });
 
  // above code returns an array with nested obj values that look like this:
  // [
  //   {
  //     params: {
  //       id: 3
  //     }
  //   },
  //   {
  //     params: {
  //       id: 2
  //     }
  //   }
  // ]
  
}

// Fetches and processes the content of a specific post by its id, converting markdown to HTML and returning the data.
export async function getSortedList() {

  // const filePath = path.join(dataDir, 'data.json');

  //const jsonString = fs.readFileSync(filePath, 'utf8');

   let jsonString;
    try {
      // next line ususes got synchronously to retrive via https our json data from wp site
      jsonString = await got(dataURL);
      console.log(jsonString.body);
    } catch (error) {
      jsonString.boy = [];
      console.log(error);
    }
 
  // Use gray-matter to parse the post metadata section
  // const jsonObj = JSON.parse(jsonString);

  const jsonObj = JSON.parse(jsonString.body);

  jsonObj.sort(function(a, b) {
// Use remark to convert markdown into HTML string
    return a.post_title.localeCompare(b.post_title);

  });

  return jsonObj.map(item => {
    return {
      id: item.ID.toString(),
      name: item.post_title
    }
  });
}

export async function getData(idRequested) {

  // const filePath = path.join(dataDir, 'data.json');

  //const jsonString = fs.readFileSync(filePath, 'utf8');

  let jsonString;
    try {
      // next line ususes got synchronously to retrive via https our json data from wp site
      jsonString = await got(dataURL);
      console.log(jsonString.body);
    } catch (error) {
      jsonString.boy = [];
      console.log(error);
    }


  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  const objMatch = jsonObj.filter(obj => {
    return obj.ID.toString() === idRequested;
  });

  let ObjReturned;
  if (objMatch.length > 0) {
    ObjReturned = objMatch[0];
  } else {
    ObjReturned = {};
  }

  // console.log(ObjReturned);

  // Return object value
  return ObjReturned;
}