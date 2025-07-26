import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f1fdf0] text-[#155217] min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  );
}