import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed categories
  const categories = [
    'Restaurantes',
    'Salud',
    'Barbería',
    'Transporte',
    'Educación',
    'Tecnología',
    'Belleza',
    'Hogar',
    'Legal',
    'Mascotas',
    'Eventos',
    'Otros',
  ];

  for (const name of categories) {
    await prisma.category.create({ data: { name } });
  }

  // Seed provinces
  const provinces = [
    'Artemisa', 'Cienfuegos', 'Granma', 'Guantánamo', 'Holguín',
    'La Habana', 'Las Tunas', 'Matanzas', 'Pinar del Río',
    'Sancti Spíritus', 'Santiago de Cuba', 'Villa Clara',
    'Isla de la Juventud', 'Ciego de Ávila', 'Camagüey', 'Mayabeque'
  ];

  await prisma.province.createMany({
    data: provinces.map(name => ({ name, isActive: name === 'Cienfuegos' }))
  });

  // Seed municipalities
  const municipalities = [
    'Cienfuegos', 'Abreus', 'Cumanayagua', 'Lajas',
    'Río Primero', 'Río Seco', 'La Esperanza', 'Palmira', 'Guaricahuado'
  ];

  await prisma.municipality.createMany({
    data: municipalities.map(name => ({ name, provinceName: 'Cienfuegos' }))
  });

  // Seed admin user
  await prisma.user.create({
    data: {
      email: 'admin@anunciale.com',
      password: 'securepassword', // You should hash the password in production
      role: 'SUPER_ADMIN'
    }
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
