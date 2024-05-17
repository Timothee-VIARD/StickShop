import http from 'http';
import express, * as bodyParser from 'express';
import router from './routes/router.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import specs from './swaggerConfig.js';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(bodyParser.json());

app.use(router);
app.use('/images', express.static('images'));

app.set('port', process.env.PORT || 3001);
const server = http.createServer(app);
server.listen(process.env.PORT || 3001);
