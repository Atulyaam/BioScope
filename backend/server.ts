import { config } from "./config/config";
import connectDb from "./config/db";
import app from "./app";

const startServer = async () => {
  const PORT = config.port;

  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Server Start Error:", error);
  }
};

startServer();
