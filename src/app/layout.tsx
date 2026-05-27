import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Death Note",
  description: "A personal interactive notebook inspired by dark fantasy aesthetics.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
