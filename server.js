const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { createSession } = require('better-sse');

app.disable('x-powered-by');
app.enable('trust proxy');

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.resolve(__dirname, 'dist'));

const distRoot = path.resolve(__dirname, 'dist');

app.use(express.static(distRoot));

app.use(cors());

app.get('/sse', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  // 模拟每隔一段时间推送一次数据，实际可替换为模型生成文本逻辑
  const interval = setInterval(() => {
    const data = `data: This is a message at ${new Date().toISOString()}\n\n`;
    res.write(data);
  }, 1000);

  // 设置客户端断开连接时的清理逻辑
  req.on('close', () => {
    clearInterval(interval);
  });
});

// https://matthewwid.github.io/better-sse/
app.get('/better-sse', async (req, res) => {
  const session = await createSession(req, res);

  const interval = setInterval(() => {
    session.push('This is a better sse message at ' + new Date().toISOString(), 'better-sse-event');
  }, 1000);

  session.addListener('disconnected', () => {
    console.log('disconnected');
    clearInterval(interval);
  });

  req.on('close', () => {
    console.log('closed');
    clearInterval(interval);
  });
});

app.use(function (err, req, res, next) {
  if (err) {
    res.status(500).send('server is down.');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.info(`==> 🍺  Express server running at localhost: ${PORT}`);
});
