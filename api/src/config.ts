import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config();

class Config {
  public PORT: number | undefined;

  public NODE_ENV: string | undefined;

  public MONGO_URL: string | undefined;

  public CLIENT_URL: string | undefined;

  public REDIS_HOST: string | undefined;

  public JWT_ACCESS_TOKEN_EXPIRES_IN: number | undefined;

  public JWT_REFRESH_TOKEN_EXPIRES_IN: number | undefined;

  public JWT_ACCESS_PRIVATE_KEY: string | undefined;

  public JWT_ACCESS_PUBLIC_KEY: string | undefined;

  public JWT_REFRESH_PRIVATE_KEY: string | undefined;

  public JWT_REFRESH_PUBLIC_KEY: string | undefined;

  public MONGO_INITDB_DATABASE: string | undefined;

  public CLOUDINARY_CLOUD: string | undefined;

  public CLOUDINARY_API_KEY: string | undefined;

  public CLOUDINARY_API_SECRET: string | undefined;

  public SENDGRID_API_KEY: string | undefined;

  public SENDGRID_SENDER: string | undefined;

  public DEV_SENDER_EMAIL: string | undefined;

  public DEV_SENDER_EMAIL_PASSWORD: string | undefined;

  constructor() {
    this.PORT = Number(process.env.PORT) || 5684;
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:6939/typical-chat";
    this.CLIENT_URL = process.env.CLIENT_URL || "http://localhost:";
    this.REDIS_HOST = process.env.REDIS_HOST || "redis://localhost:6379";
    this.JWT_ACCESS_TOKEN_EXPIRES_IN = 15;
    this.JWT_REFRESH_TOKEN_EXPIRES_IN = 60;
    this.JWT_ACCESS_PRIVATE_KEY = process.env.JWT_ACCESS_PRIVATE_KEY || "";
    this.JWT_ACCESS_PUBLIC_KEY = process.env.JWT_ACCESS_PUBLIC_KEY || "";
    this.JWT_REFRESH_PRIVATE_KEY = process.env.JWT_REFRESH_PRIVATE_KEY || "";
    this.JWT_REFRESH_PUBLIC_KEY = process.env.JWT_REFRESH_PUBLIC_KEY || "";
    this.MONGO_INITDB_DATABASE = process.env.MONGO_INITDB_DATABASE || "typical-chat";
    this.CLOUDINARY_CLOUD = process.env.CLOUDINARY_CLOUD || "";
    this.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "";
    this.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "";
    this.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
    this.SENDGRID_SENDER = process.env.SENDGRID_SENDER || "";
    this.DEV_SENDER_EMAIL = process.env.DEV_SENDER_EMAIL || "";
    this.DEV_SENDER_EMAIL_PASSWORD = process.env.DEV_SENDER_EMAIL_PASSWORD || "";
  }

  public validateVariables(): void {
    Object.entries(this).forEach(([key, value]) => {
      if (value === undefined) {
        throw new Error(`Env variable ${key} is undefined`);
      }
    });
  }

  public initCloudinary(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUDINARY_CLOUD,
      api_key: this.CLOUDINARY_API_KEY,
      api_secret: this.CLOUDINARY_API_SECRET,
    });
  }
}

export const config: Config = new Config();
