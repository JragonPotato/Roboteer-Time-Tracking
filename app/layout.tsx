'use client';

import './globals.css';
import NavBar from '../components/NavBar';
import { Container } from 'reactstrap';
import Footer from '../components/Footer';
import React from 'react';
import { Auth0Provider } from '@auth0/nextjs-auth0';

import {Tomorrow} from "next/font/google"
import localFont from "next/font/local"


const tomorrow = Tomorrow({ weight: "300", subsets: ["latin"], variable: "--font-tomorrow" });
const revamped = localFont({ src: "Revamped.woff2", variable: "--font-revamped" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <Auth0Provider>
          <main id="app" className={`main ${tomorrow.variable} ${revamped.variable}`}>
            <NavBar />
            <div className="content">{children}</div>
            <Footer />
          </main>
        </Auth0Provider>
      </body>
    </html>
  );
}
