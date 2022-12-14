import svgSprite from "gulp-svg-sprite";

//копирует и переносит файлы из src/svgicons в dist/images
export const svgSprive = () => {
  return app.gulp
    .src(`${app.path.src.svgicons}`, {}) // получили файлы
    .pipe(
      // для ошибок
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG",
          message: "Error: <% error.message %>",
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: `../icons/icons.svg`,
            //создаем страницу с перечнем иконок
            example: true,
          },
        },
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.images}`)); //перенесли файлы
};
