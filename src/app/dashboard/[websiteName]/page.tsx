export default async function DashboardPage({params}: {params: {websiteName: string}}) {
    const {websiteName} = await params;
    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-blue-500">Dashboard for {websiteName}</h1>
            </div>
        </div>
    )
}