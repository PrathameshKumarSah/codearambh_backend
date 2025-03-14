import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import webRoutes from "./src/routes/web.routes.js";
// import cookieParser from "cookie-parser";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());

app.use(
  cors({
    origin: "*", // Allows access from anywhere
    credentials: true,
  })
);


app.use('/api', webRoutes);
app.get('/test', (req, res) => res.send("testing"));

// export default connection;
export let connection;
export const config = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 100,   // Maximum number of connections in the pool
    queueLimit: 0          // No limit on the number of queued connection requests
};

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server is listening on port ${PORT}`);
});

