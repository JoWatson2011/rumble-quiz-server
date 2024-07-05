const express = require("express");
const cors = require("cors");
const http = require("http");
const { configureSockets } = require("./sockets/configure-sockets.js");

const {
  apiRouter,
  usersRouter,
  avatarsRouter,
  soundRouter,
  logsRouter,
} = require("./routes/index.js");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

configureSockets(server);

app.use("/api", apiRouter);

app.use("/api/users", usersRouter);

app.use("/api/avatars", avatarsRouter);

app.use("/api/sounds", soundRouter);

app.use("/api/logs", logsRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  if (["22P02", "23502"].includes(err.code)) {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = { app, server };
