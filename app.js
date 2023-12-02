import express from "express"
import dotenv from "dotenv"

import cors from "cors"
import detailsRouter from "./routes/details.routes.js"
import connectDB from "./db/dbConnection.js";
dotenv.config();

const app = express();


connectDB();


app.use(express.json());

// app.use(
//     cors({
//         origin: [process.env.FRONTEND_BASE_URL, process.env.SERVER_BASE_URL],
//     })
// );
app.use(
    cors({
        origin: "*",
    })
);


app.use("/api/v1/details", detailsRouter);

app.listen(process.env.PORT || 7000, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});





