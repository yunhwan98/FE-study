import "./globals.css";
import NavBar from "./components/NavBr";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
