import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Social Media App",
  description: "Create post and publish",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
