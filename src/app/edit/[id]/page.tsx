import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { User } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditUserForm from '@/components/Popup';

export default async function EditUserPage({ params }: { params: { id: number } }) {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const parsedId: number = parseInt(params.id as unknown as string, 10);
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: parsedId as number,
    },
  });
  if (!user) {
    notFound();
  }
  // console.log(id);

  return (
    <main>
      <EditUserForm user={user} />
    </main>
  );
}
