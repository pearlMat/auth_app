import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import devBundle from './devBundle';
import Template from './../template';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();
// this is for development only!
devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd(); //middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
// routes
app.use('/', authRoutes);
app.use('/', userRoutes);
//base route
app.get('/', (req, res) => {
	res.status(200).send(Template());
});
export default app;
