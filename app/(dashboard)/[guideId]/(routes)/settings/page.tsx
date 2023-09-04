import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({
  params
}: {
  params: { guideId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const guide = await prismadb.guide.findFirst({
    where: {
      id: params.guideId,
      userId
    }
  });

  if (!guide) {
    redirect('/');
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={guide} />
      </div>
    </div>
  );
}

export default SettingsPage;
