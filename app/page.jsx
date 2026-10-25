'use client';

import React from 'react';

import Hero from '../components/Hero';
import { useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';
import Buttons from "../components/Buttons"

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  return (
    <>
      {!isLoading && !user && (
        <a className="btn" href="/auth/login"><span className="btn-text">
          Log in
          </span>
        </a>
      )}
      {!isLoading && user && (
        <Buttons />
      )}
    </>
  );
}
