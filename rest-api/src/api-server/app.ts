import express from "express";
import { getEnvironment } from "../environment";

const app = express();

app.listen( (err: unknown) => {
    if(err){
        console.warn("Unable to start express application", err);
    } else {
        console.log(`Express listening on port: ${getEnvironment().API_PORT}`);
    }
})