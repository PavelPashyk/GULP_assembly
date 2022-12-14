import dartSass from "sass"; //сам scss
import gulpSass from "gulp-sass"; // плагин для gulp-scss
import rename from "gulp-rename"; // для переименнования
import cleanCss from "gulp-clean-css"; // сжатие css
import webpcss from "gulp-webpcss"; // вывод webp изображений
import autoprefixer from "gulp-autoprefixer"; // добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; // группировка медиа запросов

const sass = gulpSass(dartSass);

//копирует и переносит файлы из src/scss в dist/css
export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: app.isDev }) //1 получили файлы 2(после запятой) чтобы была доступна карта scss (isDev:true мы видем карту)
      .pipe(
        // для ошибок
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <% error.message %>",
          })
        )
      )
      .pipe(app.plugins.replace(/@img\//g, "../img/"))
      .pipe(
        sass({
          outputStyle: "expanded", //стиль готового файла - расширенный
        })
      )
      /*
    .pipe(groupCssMediaQueries())//- без if режим
    .pipe(
      webpcss({
        webpClass: ".webp",
        noWebpClass: ".no-webp",
      })//- без if режим
    )
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserlist: ["last 3 versions"],
        cascade: true,
      })//- без if режим
    )
      */
      .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries())) // + if режим
      .pipe(
        app.plugins.if(
          app.isBuild,
          webpcss({
            webpClass: ".webp",
            noWebpClass: ".no-webp",
          }) // + if режим
        )
      )
      .pipe(
        app.plugins.if(
          app.isBuild,
          autoprefixer({
            grid: true,
            overrideBrowserlist: ["last 3 versions"],
            cascade: true,
          }) // + if режим
        )
      )
      .pipe(app.gulp.dest(app.path.build.css)) //создает не сжатый дубль файл стилей без префикса .min. его можно коментировать если он не нужен
      .pipe(app.plugins.if(app.isBuild, cleanCss())) // + if режим
      /*
      .pipe(cleanCss()) //- без if режим
      */
      .pipe(
        rename({
          extname: ".min.css",
        })
      )
      .pipe(app.gulp.dest(app.path.build.css)) //перенесли файлы
      .pipe(app.plugins.browsersync.stream())
  ); // обнавляем браузер
};
