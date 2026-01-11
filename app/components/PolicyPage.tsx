"use client";
export default function PolicyPage({
  params,
}: {
  params: { content: string; heading: string };
}) {
  const { content, heading } = params;

  return (
    <div className="px-4 py-16">
      <div className="justify-center items-center bg-background-ultra-light h-[200px] flex">
        <h1 className="text-2xl font-bold">{heading}</h1>
      </div>
      <div className="max-w-7xl mx-auto">
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="py-16 px-4"
        />
      </div>
    </div>
  );
}
