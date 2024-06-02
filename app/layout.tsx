import "../styles/globals.css";
import Search from "./Search";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body className="bg-zinc-900 text-white overflow-x-hidden">
        <main className="flex flex-col justify-center items-center mt-8 w-screen">
          <h1 className="font-bold mb-8">League Of Search</h1>
          <div className="flex-1 border-none">
            <Search />
            <div className="items-center justify-center flex flex-col">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
