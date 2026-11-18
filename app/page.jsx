"use client"

import { useUser } from '@auth0/nextjs-auth0';
import Buttons from "../components/Buttons"

export default function Index() {
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
