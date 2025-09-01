import cron from "node-cron";
import axios from "axios";
import server from "./src/routes/index.js";
import { api_url, env } from "./src/config/index.js";

server.listen(env.PORT, async () => {
  if (parseInt(env.LOCAL != 1)) {
    cron.schedule("*/3 * * * *", async () => {
      try {
        await axios.get(api_url);
      } catch (error) {
        console.error(`Health check error: ${error.message}`);
      }
    });
  }

  console.log("API working just fine.");
});
