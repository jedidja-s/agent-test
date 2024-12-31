import React from 'react';
import './globals.css';

export const metadata = {
  title: 'LangChain Agent Chat',
  description: 'A chat interface using LangChain and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
