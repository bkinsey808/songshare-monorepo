import type { CapacitorConfig } from "@capacitor/cli";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../../.env") });

const capacitorConfig: CapacitorConfig = {
  appId: process.env.APP_ID,
  appName: process.env.APP_NAME,
  webDir: "dist",
};

export default capacitorConfig;
