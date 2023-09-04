import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { guideId: string }
}) {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
}

const guide = await prismadb.guide.findFirst({
    where: {
        id: params.guideId,
        userId
    }
});

if (!guide) {
    redirect('/')
}

return (
    <>
    <div className="">This will be a navbar</div>
    {children}
    </>
)
}