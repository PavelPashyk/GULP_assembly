//копирует и переносит файлы из src/files в dist/files
export const copy = () => {
  return app.gulp
    .src(app.path.src.files) //получили файлы
    .pipe(app.gulp.dest(app.path.build.files)); //перенесли файлы
};
