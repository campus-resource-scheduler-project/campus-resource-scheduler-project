'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { deleteResource } from '@/lib/dbActions';

export default function DeleteResourcePage() {
  const { id } = useParams();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && id) {
      const doDelete = async () => {
        await deleteResource(Number(id));
        router.push('/admin');
      };
      doDelete();
    }
  }, [id, status, router]);

  if (status === 'loading') return <p>Checking permissions...</p>;
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  return <p>Deleting resource...</p>;
}
