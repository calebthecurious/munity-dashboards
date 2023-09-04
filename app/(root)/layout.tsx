import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const guide = await prismadb.guide.findFirst({
    where: {
      userId,
    }
  });

  if (guide) {
    redirect(`/${guide.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
