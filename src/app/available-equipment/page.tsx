// app/available-equipment/page.tsx

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import AvailableEquipment from '@/components/AvailableEquipment';

export default async function AvailableEquipmentPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');

  const prisma = new PrismaClient();

  let equipment: {
    id: number;
    name: string;
    category: string;
    type: string;
    owner: string;
    location: string;
    campus: string;
    image: string;
    posted: string;
    deadline: string | null;
  }[] = [];

  try {
    const rawEquipment = await prisma.resource.findMany({
      where: {
        type: 'equipment',
        owner: 'admin@foo.com',
      },
      orderBy: { posted: 'desc' },
      select: {
        id: true,
        name: true,
        category: true,
        type: true,
        owner: true,
        location: true,
        campus: true,
        image: true,
        posted: true,
        deadline: true,
      },
    });

    equipment = rawEquipment.map((item) => ({
      id: Number(item.id),
      name: item.name ?? '',
      category: item.category ?? '',
      type: item.type,
      owner: item.owner,
      location: item.location ?? '',
      campus: item.campus ?? '',
      image: item.image ?? '/images/default-resource.jpg',
      posted: item.posted.toString().split('T')[0],
      deadline: item.deadline ? new Date(item.deadline).toISOString() : null,
    }));
  } catch (err) {
    console.error('Error fetching equipment:', err);
  } finally {
    await prisma.$disconnect();
  }

  console.log('Fetched equipment:', equipment);

  return (
    <main id="hasBG" style={{ minHeight: '100vh', overflow: 'auto', paddingBottom: '80px' }}>
      <AvailableEquipment initialResources={equipment} />
    </main>
  );
}
