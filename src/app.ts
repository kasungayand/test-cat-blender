/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express, { Application, urlencoded } from "express";

import {ImageModule} from "./controllers/controllers.module";

const app: Application = express();

app.use(urlencoded({ extended: false }));
app.use(express.json());

ImageModule.writeImage().then((res) => {
  console.log(res);
}).catch((error) => {
  console.log(error);
});

export default app;