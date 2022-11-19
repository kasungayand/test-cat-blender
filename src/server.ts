import "reflect-metadata";
import app from "./app";
import * as application from "./config";
const PORT = application.config.SERVER.PORT;

const server = app.listen(PORT,(): void  => {
  console.log("Server started in port",PORT);
}).on("error",(err:any) =>{
  throw err;
});

export default server;