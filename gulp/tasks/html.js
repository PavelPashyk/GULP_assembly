import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number"; // добавляет версию

//копирует и переносит файлы html из src/files в dist/files
export const html = () => {
  return (
    app.gulp
      .src(app.path.src.html) //получили файлы
      .pipe(
        //для вывода ошибок
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(fileinclude()) // вызываем файл fileinclude
      .pipe(app.plugins.replace(/@img\//g, "img/")) // заменяет @img в окончательных файлах на img
      /*
    .pipe(webpHtmlNosvg()) // вызываем файл webpHtmlNosvg - без if режим
    .pipe(
      versionNumber({
        // добавляет версию для css и js в формате даты "%DT%" - без if режим
        value: "%DT%",
        append: {
          key: "_v",
          cover: 0,
          to: ["css", "js"],
        },
        output: {
          file: "gulp/version.json",
        },
      })
    )
      */
      .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg())) // вызываем файл webpHtmlNosvg + if режим
      .pipe(
        app.plugins.if(
          app.isBuild,
          versionNumber({
            // добавляет версию для css и js в формате даты "%DT%" + if режим
            value: "%DT%",
            append: {
              key: "_v",
              cover: 0,
              to: ["css", "js"],
            },
            output: {
              file: "gulp/version.json",
            },
          })
        )
      )
      .pipe(app.gulp.dest(app.path.build.html)) //перенесли файлы
      .pipe(app.plugins.browsersync.stream())
  ); //выполняем обновление браузера при изменениях
};
