//основной модуль
import gulp from "gulp";

// импорт путей path
import { path } from "./gulp/config/path.js";

//импорт общих плагинов plugins
import { plugins } from "./gulp/config/plugins.js";

//передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"), //режим продакшен
  isDev: !process.argv.includes("--build"), //режим разработчика, многое не добавляется
  path: path,
  gulp: gulp,
  plugins: plugins,
};

//импорт задач из tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

//наблюдатели за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy); //1 путь к файлам за которыми нужно следить, 2(после запятой) действие которое нужно выполнить
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { svgSprive };

//последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//основные задачи
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
); //parallel - выполняет параллельно | series - выполняет последовательно

//построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); // режим разработчика
const build = gulp.series(reset, mainTasks); //режим продакшена
const deployZIP = gulp.series(reset, mainTasks, zip); //режим создания архива
const deployFTP = gulp.series(reset, mainTasks, ftp); //режим создания ftp

// экспорт сценариев
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

//выполнение сценария по умолчанию
gulp.task("default", dev);
