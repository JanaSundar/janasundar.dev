import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import Logo from './SVG/Logo';

interface NavLinkProps {
  children: React.ReactNode;
  path: string;
}

const NavLink: FC<NavLinkProps> = ({ path, children }) => {
  const { asPath } = useRouter();
  const isActive = asPath === path;
  return (
    <li className={`relative font-bold`}>
      <Link href={path} passHref>
        <motion.a
          className="text-sm sm:text-base"
          animate={{
            color: isActive ? '#ffffff' : '#9ca3b0e6',
          }}
        >
          {children}
        </motion.a>
      </Link>
    </li>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-primary/10 z-50 sticky top-0 navbar">
      <div className="max-w-4xl min-h-[70px] text-base items-center mx-auto flex px-4 flex-row justify-between">
        <Link href="/" passHref>
          <a className="font-bold text-lg" aria-label="Logo">
            <Logo />
          </a>
        </Link>
        <ul className="flex gap-4">
          <NavLink path="/">Home</NavLink>
          <NavLink path="/blog">Blog</NavLink>
          {/* <NavLink path="/snippets">Snippets</NavLink> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
