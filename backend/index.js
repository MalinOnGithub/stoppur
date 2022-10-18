import  express from "express";
import route from "./route.js";

const server = express();
const PORT = 5000;

server.use(express.json());

server.listen(PORT, () => console.log("Server started on port " +PORT));

server.use("/api/stopwatch", route);