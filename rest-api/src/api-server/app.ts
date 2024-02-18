import express from "express";
import * as env from "@env/environment";

const app = express();

app.listen(env.values.API_PORT, () => {
    console.log(`Express listening on port: ${env.values.API_PORT}`);
});