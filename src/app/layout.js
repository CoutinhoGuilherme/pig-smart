import localFont from "next/font/local";
import {Poppins} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '500', '700'],
  variable: '--font-poppins'
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "PigSmart",
  description: "AI powered advisor",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <html>
                <body className={poppins.className}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
