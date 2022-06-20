import * as fs from 'fs';
import * as http from 'http';

const name = 'haha.jpg';
const url = "https://vods.funday.asia/mydl.asp?F=E2213337.mp4";
const url2 = "https://www.fun-day.com.tw/tutor/tutor_files/69291_291881_ee6bc4d464ea43c99791607213a82c85.pdf";
const url3 = "http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg";

export const download_es6 = (url: string, dest: string) => {
    let file = fs.createWriteStream(dest);
    return new Promise<void>((resolve, reject) => {
        let responseSent = false; // flag to make sure that response is sent only once.
        http.get(url, response => {
          response.pipe(file);
          file.on('finish', () =>{
            file.close(() => {
              if(responseSent)  return;
              responseSent = true;
              resolve();
            });
          });
        }).on('error', err => {
            if(responseSent)  return;
            responseSent = true;
            reject(err);
        });
    });
};

export const download = (url: string, dest: string) => {
    let file = fs.createWriteStream(dest);
    http.get(url, response => {
      response.pipe(file);

      file.on('finish', () => file.close());
    });
};

// create folder
// fs.mkdirSync('haha');
// download file
download_es6(url3, name);
// 下載成功但無法播放/開啟 
// mp4 / pdf下載方式不同

