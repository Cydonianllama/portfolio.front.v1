import ReactQueryProvider from "@/providers/reactQueryProvider";

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      {children}
    </ReactQueryProvider>
  );
}