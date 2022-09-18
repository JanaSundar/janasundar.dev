import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

interface NavLinkProps {
  children: React.ReactNode;
  path: string;
}

const NavLink: FC<NavLinkProps> = ({ path, children }) => {
  const { asPath } = useRouter();
  const isActive = asPath === path;
  return (
    <motion.li
      className={`relative font-bold`}
      layout
    >
      <Link href={path} passHref>
        <a className="text-sm sm:text-base">{children}</a>
      </Link>
      {isActive ? (
        <motion.div
          className="bg-white border-[1px] absolute bottom-0 left-0 right-0 rounded-full"
          layoutId="underline"
        />
      ) : null}
    </motion.li>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-primary/10 z-50 backdrop-blur-3xl font-poppins">
      <div className="max-w-4xl min-h-[70px] text-base items-center mx-auto flex px-4 flex-row justify-between">
        <Link href="/" passHref>
          <a className="font-bold text-lg">Jana</a>
        </Link>
        <ul className="flex gap-4">
          <NavLink path="/">Home</NavLink>
          <NavLink path="/blog">Blog</NavLink>
          <NavLink path="/snippets">Snippets</NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
