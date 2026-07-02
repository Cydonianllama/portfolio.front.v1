import AppLayout from "@/layouts/appLayout/layout";

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();

  // if (pathname === "/backoffice/login") {
  //   return <>{children}</>;
  // }

  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}
