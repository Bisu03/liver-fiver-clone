import express from 'express'
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from './db/DB.js';
import cookieParser from 'cookie-parser';
import path from "path"
import { fileURLToPath } from 'url';

import userRoute from "./routes/user.routes.js"
import authRoute from "./routes/auth.routes.js"
import gigRoute from "./routes/gig.routes.js"
import filesRoute from "./routes/files.routes.js"
import reviewRoute from "./routes/review.routes.js"
import orderRoute from "./routes/order.routes.js"
import conversationRoute from "./routes/conversation.routes.js"
import messageRoute from "./routes/message.routes.js"

const app = express()
dotenv.config();
const port = process.env.PORT
connectDB()

let allowedOrigins = process.env.CLIENT_URL

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
        origin: allowedOrigins, credentials: true
    })
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/files", filesRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).send(errorMessage);
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))