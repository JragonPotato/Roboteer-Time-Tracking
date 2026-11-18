'use  client';

import { useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="navbar">
      <a className="logo btn" href="/"/>
      <a className="text" href="/">
        Time Tracker
      </a>
      
      
    </div>
  );
};

export default NavBar;
