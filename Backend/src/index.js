import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

// ----------- Database Connection + Server Startup -----------
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connect error:", err);
    process.exit(1);
  });
