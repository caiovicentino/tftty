// Complete code implementation here
// Do NOT use placeholders, TODOs, or "implementation here" comments
// Write the FULL working code
import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN!,
  },
  database: {
    url: process.env.DATABASE_URL!,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  },
  openRouter: {
    apiKey: process.env.OPENROUTER_API_KEY!,
    siteUrl: process.env.OPENROUTER_SITE_URL!,
  }
};

if (!config.jwt.secret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}
if (!config.database.url) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}
if (!config.stripe.secretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}
if (!config.openRouter.apiKey) {
    throw new Error('OPENROUTER_API_KEY is not defined in environment variables');
}

export default config;