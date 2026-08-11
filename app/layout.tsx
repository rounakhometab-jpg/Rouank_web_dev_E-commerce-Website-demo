import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Zenfotech AI Academy | AI Certificate Course Online',
  description: 'Zenfotech AI Academy — Premium AI Industry Learning, Examination & Certification Platform by Zenfotech Private Limited.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
