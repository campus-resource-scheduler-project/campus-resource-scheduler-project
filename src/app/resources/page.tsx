import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { PrismaClient, Resource } from '@prisma/client';
import YourResources from '@/components/YourResources';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Server component for resources page
export default async function ResourcesPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not authenticated
  if (!session) {
    redirect('/api/auth/signin');
  }

  // Get resources for this user from database
  const prisma = new PrismaClient();
  const userEmail = session.user?.email;

  let resources: Resource[] = [];

  try {
    resources = await prisma.resource.findMany({
      where: {
        ...(userEmail ? { owner: userEmail } : {}),
      },
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
  } finally {
    await prisma.$disconnect();
  }

  // Pass resources data to client component via props
  return (
    <main id="hasBG" style={{ minHeight: '100vh', overflow: 'auto', paddingBottom: '80px' }}>
      <YourResources initialResources={resources} />
    </main>
  );
}
