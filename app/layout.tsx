import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    title: "The Next Chapter of Need A Ride",
    description:
      "A private digital vision for a stronger customer experience and a more connected operation.",
    icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
    },
    openGraph: {
      title: "The Next Chapter of Need A Ride",
      description: "A better way to quote, book, pay, operate, and grow.",
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1674,
          height: 941,
          alt: "The Next Chapter of Need A Ride",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "The Next Chapter of Need A Ride",
      description: "A better way to quote, book, pay, operate, and grow.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
