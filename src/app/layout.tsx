import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: 'Partner Tỵ Mùi - Đối Tác Green SM | Tuyển tài xế Platform & Partner',
  description:
    'Partner Tỵ Mùi - Đối Tác Green SM chuyên tuyển tài xế Platform và tài xế Partner tại Việt Nam. Đăng ký ngay để trở thành tài xế đối tác.',
  icons: [{ rel: 'icon', url: '/favicon.png' }],
  openGraph: {
    title: 'Partner Tỵ Mùi - Đối Tác Green SM | Tuyển tài xế Platform & Partner',
    description:
      'Partner Tỵ Mùi - Đối Tác Green SM chuyên tuyển tài xế Platform và tài xế Partner. Đăng ký ngay!',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'vi';

  return (
    <html
      lang={locale}
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950" suppressHydrationWarning>{children}</body>
    </html>
  );
}
