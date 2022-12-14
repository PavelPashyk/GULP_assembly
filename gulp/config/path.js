//получаем ия папки проекта---благодаря type:module можем подключать различные модули
import * as nodePath from "path"; //импортируем модуль path
const rootFolder = nodePath.basename(nodePath.resolve()); //и получаем имя папки проекта в const rootFolder

const buildFolder = "./dist"; // путь к папке с результатом
const srcFolder = "./src"; // путь к папке с исходниками

export const path = {
  build: {
    js: `${buildFolder}/js/`, // куда помещаем js
    css: `${buildFolder}/css/`, // куда помещаем скомпилированный scss
    html: `${buildFolder}/`, // куда помещаем html
    images: `${buildFolder}/img/`, // куда помещаем все img
    fonts: `${buildFolder}/fonts/`, // куда помещаем все шрифты
    files: `${buildFolder}/files/`, //показывает что переносим все файлы и папки в ./dist/files
  },
  src: {
    js: `${srcFolder}/js/app.js`, //путь для js
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`, //путь для img
    svg: `${srcFolder}/img/**/*.svg`, //путь для svg
    scss: `${srcFolder}/scss/style.scss`, //путь для scss
    html: `${srcFolder}/*.html`, //путь для html
    files: `${srcFolder}/files/**/*.*`, //показывает что нас интересуют все файлы и папки в ./src/files
    svgicons: `${srcFolder}/svgicons/*.svg`, //показывает что нас интересуют svg и папки в ./src/svgicons
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`, //показывает что следим за всеми js в ./src
    scss: `${srcFolder}/scss/**/*.scss`, //показывает что следим за всеми scss в ./src
    html: `${srcFolder}/**/*.html`, //показывает что следим за всеми html в ./src
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`, //показывает что следим за всеми img в ./src
    files: `${srcFolder}/files/**/*.*`, //показывает что следим за всеми файлами и папками в ./src/files
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: "test",
};
