// Complete code implementation here
// Do NOT use placeholders, TODOs, or "implementation here" comments
// Write the FULL working code
import app from './app';
import config from './config';
import prisma from './utils/prisma';

const PORT = config.port;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Prisma Client disconnected.');
  process.exit(0);
});