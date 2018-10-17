const express = require(`express`);
const app = express();
const {postsRouter} = require(`./posts/router`);

const notFoundHandler = (req, res) => {
  res.status(404).send(`Page not found`);
};

const DEFAULT_PORT = 3000;
const HOST = `127.0.0.1`;


app.use(express.static(`${__dirname}/../static`));
app.use(`/api/posts`, postsRouter);

app.use(notFoundHandler);

app.use((error, req, res, _next) => {
  if (error) {
    console.error(error);
    res.status(error.code || 500).send(error.message);
  }
});

module.exports = {
  name: `server`,
  description: `Run server on 3000 port by default`,
  execute: (command, port = DEFAULT_PORT) => {
    app.listen(port, HOST, () =>
      console.log(`Server running at http://${HOST}:${port}`)
    );
  },
  app
};