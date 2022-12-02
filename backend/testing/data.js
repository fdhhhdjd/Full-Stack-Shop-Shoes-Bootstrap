const fs = require('fs');
const path = require('path');

/**
* - Read all files in the folder
* - Contruct a JSON object with the key is the file name and the value is the file content
*/

module.exports.setupData = async function(folderName) {
  let data = this;

  try {
    fs.readdirSync(path.resolve(process.cwd(), `./testing/${folderName}/data`)).forEach(filename => {

      const filePath = path.resolve(process.cwd(), `./testing/${folderName}/data/${filename}`);


      const fileContent = fs.readFileSync(filePath, 'utf8');
      const key = filename.replace('.json', '');// remove .json from file name
      data[key] = JSON.parse(fileContent);
    });
  } catch (error) {
    console.error('Error setting data for', folderName, error);
  }
  return data;
}