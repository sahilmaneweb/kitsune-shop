import './config/envConfig.js';  // Load env variables FIRST

import express, { json, urlencoded } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get("/", (req, res) => {
    res.send("Kitsune Server Running Successfully");
});

import productRoute from './router/productRouter.js';
import userRoute from './router/userRouter.js';
import cartRoute from './router/cartRouter.js';
import orderRoute from './router/orderRouter.js';

app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server started successfully on port " + port);
    }
});
