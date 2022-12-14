import { configFTP } from "../config/ftp.js";
import vinylFTP from "vinyl-ftp";
import util from "gulp-util";

export const ftp = () => {
  configFTP.log = util.log; // выводит состояние дел
  const ftpConnect = vinylFTP.create(configFTP);// создаем подключение под именем const ftpConnect
  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {}) //получаем все файлы
    .pipe(
      // для ошибок
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FTP",
          message: "Error: <% error.message %>",
        })
      )
    )
    .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`)); // пути
};
