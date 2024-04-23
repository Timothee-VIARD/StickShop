import http from 'http';
import express from "express";
import router from "./routes/router.js";
import cors from 'cors';

const app = express();
app.use(cors());

app.use(router);
app.use('/images', express.static('images'));

app.set('port', process.env.PORT || 3001);
const server = http.createServer(app);
server.listen(process.env.PORT || 3001);