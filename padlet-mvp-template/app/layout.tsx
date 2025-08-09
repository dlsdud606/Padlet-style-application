import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "무가입 그리드 보드",
  description: "Padlet-스타일 그리드 보드 MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
