import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillMiner - あなたの中に眠る、収益化可能なスキルを採掘する",
  description:
    "AIがあなたのSNS、履歴書、趣味を分析し、本人も気づいていない収益化可能なスキルを発見。自動でスキルと案件をマッチングし、副業開始までサポートします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
