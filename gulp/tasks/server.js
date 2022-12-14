//для запуска сервера

export const server = (done) => {
  app.plugins.browsersync.init({
    server: {
      baseDir: `${app.path.build.html}`, //папка с пезультатом проекта
    },
    notify: true, //сообщеня в браузере
    port: 3000,
  });
};
