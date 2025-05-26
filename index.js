const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const views = require('koa-views');
const itemController = require('./controllers/item');

const app = new Koa();
const router = new Router();

// Configuration
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// Serve static files (e.g., views)
app.use(serve(path.join(__dirname, 'views')));

// Routes
router.get('/', itemController.index);
router.get('/items/:id', itemController.show);

app.use(router.routes()).use(router.allowedMethods());

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// SIGTERM (docker stop が送るシグナル) および SIGINT (Ctrl+C が送るシグナル) のハンドリング
const gracefulShutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server gracefully shut down.');
    // サーバーのクローズが完了したら、プロセスを終了
    process.exit(0);
  });

  // 強制終了のためのタイムアウト (例: 10秒)
  setTimeout(() => {
    console.error('Forcing shutdown after timeout.');
    process.exit(1); // タイムアウトによる異常終了
  }, 10000); // 10秒後に強制終了
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
