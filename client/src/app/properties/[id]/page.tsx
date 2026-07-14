interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <h1 className="text-2xl font-bold">Property Details - ID: {id}</h1>
    </div>
  );
}
