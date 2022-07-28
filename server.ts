import dotenv from "dotenv";
import {server} from "./src"
dotenv.config();
const port=process.env.PORT||4000;
server.listen({port}).then(({url})=>{console.log("congz your server started 🌎🔥🔥🔥",url)})