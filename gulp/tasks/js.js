import webpack from "webpack-stream";

//копирует и переносит файлы из src/js в dist/js
export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev }) //1 получили файлы 2(после запятой) чтобы была доступна карта js (isDev:true мы видем карту)
    .pipe(
      // для ошибок
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <% error.message %>",
        })
      )
    )
    .pipe(
      webpack({
        mode: app.isBuild ? "production" : "development", //режим разработчика (isBuild:false)
        output: {
          filename: "app.min.js", //файл результата
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.js)) //перенесли файлы
    .pipe(app.plugins.browsersync.stream()); // обнавляем браузер
};
