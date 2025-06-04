import app from "./app.js";
import DBConnect from "./db/dbConnect.js";
import "dotenv/config";

const port = process.env.PORT || 3001;

DBConnect()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error : ${error.message}`);
    });
    app.listen(port, () => {
      console.log("Server is running on port : ", port);
    });
  })
  .catch((error) => {
    console.log(`Database connection failed : ${error}`);
  });
