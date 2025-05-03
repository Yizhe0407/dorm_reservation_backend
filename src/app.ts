// File: src/app.t
import cors from "cors";
import dotenv from 'dotenv';
import express, { RequestHandler } from 'express';
import login from './routes/Login';
import logout from './routes/Logout';
import profile from './routes/Profile';
import register from './routes/Register';
import cookieParser from 'cookie-parser';
import verifyJWT from './middleware/verifyJWT';

dotenv.config();
const app = express();

// 設定 CORS 允許來自前端的請求
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser()); // 讓 Express 能解析 cookie

// Public routes - should be defined before authentication middleware
app.use('/api', register)
app.use('/api', login)
app.use('/api', logout)

// Apply JWT verification middleware only to routes defined *after* this line
app.use(verifyJWT as RequestHandler);

app.use('/api', profile)

const port = 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});