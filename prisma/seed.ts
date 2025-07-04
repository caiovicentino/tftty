// Complete code implementation here
// Do NOT use placeholders, TODOs, or "implementation here" comments
// Write the FULL working code
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clean up existing data
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.user.deleteMany();

  // Seed Users
  const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@makeup.com',
      name: 'Admin User',
      password: hashedPasswordAdmin,
      role: Role.ADMIN,
    },
  });

  const hashedPasswordUser = await bcrypt.hash('user123', 10);
  const regularUser = await prisma.user.create({
    data: {
      email: 'user@makeup.com',
      name: 'Regular User',
      password: hashedPasswordUser,
      role: Role.USER,
    },
  });

  console.log(`Created users: ${adminUser.name}, ${regularUser.name}`);

  // Seed Brands
  const brand1 = await prisma.brand.create({ data: { name: 'Glamour Cosmetics' } });
  const brand2 = await prisma.brand.create({ data: { name: 'Ethereal Beauty' } });
  const brand3 = await prisma.brand.create({ data: { name: 'Urban Decay' } });

  console.log(`Created brands: ${brand1.name}, ${brand2.name}, ${brand3.name}`);

  // Seed Categories
  const cat1 = await prisma.category.create({ data: { name: 'Base' } });
  const cat2 = await prisma.category.create({ data: { name: 'Batom' } });
  const cat3 = await prisma.category.create({ data: { name: 'Sombra' } });
  const cat4 = await prisma.category.create({ data: { name: 'Máscara de Cílios' } });

  console.log(`Created categories: ${cat1.name}, ${cat2.name}, ${cat3.name}, ${cat4.name}`);

  // Seed Products
  await prisma.product.createMany({
    data: [
      {
        name: 'Base Líquida Matte',
        description: 'Base de alta cobertura com acabamento matte. Longa duração e resistente à água.',
        price: 89.90,
        stock: 100,
        sku: 'GC-BLM-01',
        imageUrl: 'https://example.com/images/base_liquida.jpg',
        brandId: brand1.id,
        categoryId: cat1.id,
      },
      {
        name: 'Batom Vermelho Intenso',
        description: 'Batom cremoso com cor vibrante e hidratação para os lábios.',
        price: 45.50,
        stock: 150,
        sku: 'EB-BVI-01',
        imageUrl: 'https://example.com/images/batom_vermelho.jpg',
        brandId: brand2.id,
        categoryId: cat2.id,
      },
      {
        name: 'Paleta de Sombras Nude',
        description: 'Paleta com 12 tons de sombras neutras, perfeitas para qualquer ocasião.',
        price: 120.00,
        stock: 80,
        sku: 'UD-PSN-01',
        imageUrl: 'https://example.com/images/paleta_nude.jpg',
        brandId: brand3.id,
        categoryId: cat3.id,
      },
      {
        name: 'Máscara de Volume Extremo',
        description: 'Máscara para cílios que proporciona volume e alongamento instantâneos.',
        price: 65.00,
        stock: 200,
        sku: 'GC-MVE-01',
        imageUrl: 'https://example.com/images/mascara_volume.jpg',
        brandId: brand1.id,
        categoryId: cat4.id,
      },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });