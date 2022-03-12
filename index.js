import fs from 'node:fs';
import https from 'node:https';
import crawler from 'crawler';

function saveImageToDisk(url, localPath) {
  const fullUrl = url;
  const file = fs.createWriteStream(localPath);
  https.get(fullUrl, function (response) {
    response.pipe(file);
  });
}

// First make an image counter to make sure only 10 images will be saved.

let pictureCounter = 0;
const maxNumberOfPictures = 10; // this specifies how many pictures should be saved
const localFolderAddress = 'memes/';
const targetURL = 'https://memegen-link-examples-upleveled.netlify.app/';
// Now I can get the URLs and save them in my disk.

const c = new crawler({
  callback: function (error, res) {
    if (error) {
      console.log({ error });
    } else {
      const images = res.$('img');
      images.each((index) => {
        if (pictureCounter < maxNumberOfPictures) {
          // here you can save the file or save them in an array to download them later

          saveImageToDisk(
            images[index].attribs.src,
            localFolderAddress + (pictureCounter + 1) + '.jpg',
          );
          pictureCounter++;
        }
      });
    }
  },
});

c.queue(targetURL);
