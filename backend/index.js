import  express from "express";
import route from "./Routes/route.js";
import cors from "cors";

const server = express();
const PORT = 5000;

const corsConfig = {
    origin: "http://localhost:3000"
}

server.use(cors(corsConfig));

server.use(express.json());

server.listen(PORT, () => console.log("Server started on port " +PORT));

server.use("/api/stopwatch", route);

