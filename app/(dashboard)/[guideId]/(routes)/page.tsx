import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: {guideId: string}
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const guide = await prismadb.guide.findFirst({
        where: {
            id: params.guideId,
        }
    })

    return (
        <div className="">
            Active Guide: {guide?.name}
        </div>
    )
}

export default DashboardPage;