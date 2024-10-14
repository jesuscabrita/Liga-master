import { Providerlayout } from "@/components/Providers/Providerlayout";
import { Quicksand } from "next/font/google";
// import type { Metadata } from "next";
import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Liga Master",
//   description: "Liga de futbol",
//   keywords: ['Torneos de futbol', 'ligas de futbol', 'estadisticas de jugadores y partidos'],
//   authors: [
//     { name: "Jesus Cabrita", url: "https://github.com/jesuscabrita" }
//   ],
//   publisher: "Liga Master",
//   // robots: "index, follow",
//   openGraph: {
//     type: 'website',
//     url: 'https://front-deportes.vercel.app/',
//     title: 'Liga Master',
//     description: 'Liga de futbol.',
//     images: [
//       {
//         url: 'https://front-deportes.vercel.app/images/logo1.png',
//         width: 4501,
//         height: 4500,
//         alt: 'Liga master Logo'
//       }
//     ],
//     siteName: 'Liga Master',
//   },
//   manifest: "/site.webmanifest",
// };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={quicksand.className}>
        <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'space-between' }}>
          <Providerlayout>
            {children}
          </Providerlayout>
        </main>
      </body>
    </html>
  );
}