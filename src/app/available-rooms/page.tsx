import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import AvailableRooms from '@/components/AvailableRooms';

export default async function AvailableRoomsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const prisma = new PrismaClient();
  let rooms: {
    id: number;
    name: string;
    category: string;
    type: string;
    owner: string;
    location: string;
    campus: string;
    image: string;
    posted: Date;
    deadline: Date | null;
  }[] = [];

  try {
    const rawRooms = await prisma.resource.findMany({
      where: {
        type: 'room',
        owner: 'admin@foo.com',
      },
      orderBy: {
        posted: 'desc',
      },
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

    rooms = rawRooms.map(room => ({
      ...room,
      id: Number(room.id),
      posted: new Date(room.posted),
      image: room.image ?? '',
      deadline: room.deadline ? new Date(room.deadline) : null,
    }));
  } catch (error) {
    console.error('Error fetching rooms:', error);
  } finally {
    await prisma.$disconnect();
  }

  return (
    <main id="hasBG" style={{ minHeight: '100vh', overflow: 'auto', paddingBottom: '80px' }}>
      <AvailableRooms initialResources={rooms} />
    </main>
  );
}
