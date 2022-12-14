import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

//копирует и переносит файлы из src/images в dist/images
export const images = () => {
  return (
    app.gulp
      .src(app.path.src.images) // получили файлы
      .pipe(
        // для ошибок
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "IMAGES",
            message: "Error: <% error.message %>",
          })
        )
      )
      .pipe(app.plugins.newer(app.path.build.images)) // проверяем картинки
      /*
    .pipe(webp()) //создадим изображения webp - без if режим
    .pipe(app.gulp.dest(app.path.build.images)) //выгружаем в папку с резулитатом - без if режим
    .pipe(app.gulp.src(app.path.src.images)) //получаем img - без if режим
    .pipe(app.plugins.newer(app.path.build.images)) // проверяем картинки - без if режим
    .pipe(
      imagemin({
        // плагин для сжатия - без if режим
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, //0 to 7
      })
    )
    */
      .pipe(app.plugins.if(app.isBuild, webp())) //создадим изображения webp + if режим
      .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images))) //выгружаем в папку с резулитатом + if режим
      .pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images))) //получаем img + if режим
      .pipe(
        app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images)) // проверяем картинки + if режим
      )
      .pipe(
        app.plugins.if(
          app.isBuild,
          imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, //0 to 7
          }) // плагин для сжатия + if режим
        )
      )
      .pipe(app.gulp.dest(app.path.build.images)) //перенесли файлы
      .pipe(app.gulp.src(app.path.src.svg)) //получаем svg
      .pipe(app.gulp.dest(app.path.build.images)) //перенесли файлы
      .pipe(app.plugins.browsersync.stream())
  ); // обнавляем браузер
};
