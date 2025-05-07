/* eslint-disable max-len */
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import AvailableEquipment from '@/components/AvailableEquipment';

export default async function AvailableEquipmentPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const prisma = new PrismaClient();
  let equipment: { name: string; id: number; category: string; type: string; owner: string; location: string; campus: string; image: string; posted: string; deadline: string | null; }[] = [];

  try {
    equipment = await prisma.resource.findMany({
      where: {
        type: 'equipment',
        owner: 'admin@foo.com',
      },
      orderBy: {
        posted: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching equipment:', error);
  } finally {
    await prisma.$disconnect();
  }

  return (
    <main id="hasBG" style={{ minHeight: '100vh', overflow: 'auto', paddingBottom: '80px' }}>
      <AvailableEquipment initialResources={equipment} />
    </main>
  );
}
