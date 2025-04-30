import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import usersRoutes from './routes/UsersRoutes';

dotenv.config();
// Example usage:
const app = express();

// 設定 CORS 允許來自前端的請求
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use('/api/auth', usersRoutes)

const port = 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});