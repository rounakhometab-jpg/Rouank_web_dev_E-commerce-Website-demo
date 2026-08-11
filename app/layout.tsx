import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Zenfotech AI Academy | AI Certificate Course Online',
  description: 'Zenfotech AI Academy — Premium AI Industry Learning, Examination & Certification Platform by Zenfotech Private Limited.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100 overflow-x-hidden w-full max-w-full">
      <body className="bg-slate-950 text-slate-100 min-h-screen w-full max-w-full overflow-x-hidden antialiased m-0 p-0" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
