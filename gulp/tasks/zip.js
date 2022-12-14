import { deleteAsync } from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
  deleteAsync(`./${app.path.rootFolder}.zip`); // удаляем архив, если он есть
  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {}) //получаем все файлы
    .pipe(
      // для ошибок
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "ZIP",
          message: "Error: <% error.message %>",
        })
      )
    )
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`)) // получаем zip  с именем проекта
    .pipe(app.gulp.dest("./")); // выводим результат
};
