import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import EditResourceForm from '@/components/EditResourceForm';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditResourcePage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const resourceId = parseInt(params.id, 10);
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
  });

  if (!resource) return notFound();

  return (
    <main className="p-4">
      <h2 className="text-center mb-4">Edit Resource</h2>
      <EditResourceForm resource={resource} />
    </main>
  );
}
