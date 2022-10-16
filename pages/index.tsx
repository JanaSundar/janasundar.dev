import React, { FC, ReactNode } from 'react';
import GithubIcon from '~components/SVG/GithubIcon';
import TwitterIcon from '~components/SVG/TwitterIcon';
import { motion, Variants } from 'framer-motion';
import LinkedInIcon from '~components/SVG/LinkedInIcon';
import Newsletter from '~components/Newsletter';
import Link from 'next/link';
import DownloadIcon from '~components/SVG/DownloadIcon';

const socialLinks = [
  {
    name: 'github',
    href: 'http://github.com/janasundar',
    icon: <GithubIcon />,
  },
  {
    name: 'twitter',
    href: 'https://twitter.com/jana__sundar',
    icon: <TwitterIcon />,
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/janasundar/',
    icon: <LinkedInIcon />,
  },
];

const staggerAnimation: Variants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const variants: Variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: i * 0.2 },
  }),
  hidden: {
    opacity: 0,
  },
};

const Paragragh: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className="pb-4 leading-relaxed md:leading-8 md:text-lg tracking-wide md:tracking-wider">{children}</p>;
};

const Home = () => {
  return (
    <>
      <section id="intro" className="h-[calc(100vh_-_100px)] flex items-center text-gray-400/90 full-bleed">
        <motion.div className="mx-auto" variants={staggerAnimation} initial="hidden" animate="visible">
          <motion.h1 className="uppercase text-base pb-4 tracking-wide" variants={variants} custom={1}>
            Hey, My name is Jana
          </motion.h1>
          <motion.h2
            className="text-2xl sm:text-4xl font-bold leading-[1.6_!important] sm:leading-[1.4_!important] tracking-wide"
            custom={2}
            variants={variants}
          >
            <span className="text-white">Developer and Javascript enthusiast from India.</span> I’m interested in React,
            Node, Jamstack, Typescript.
          </motion.h2>
          <motion.div className="my-6 flex gap-4" variants={variants} custom={3}>
            {socialLinks.map((link) => (
              <a
                href={link.href}
                key={link.name}
                rel="noopener noreferrer"
                className="hover:text-white transition"
                target="_blank"
                aria-label={link.name}
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </section>
      <section id="about" className="pt-20 sm:pt-36 flex justify-center flex-col text-base text-gray-400/90">
        <h1 className="uppercase pb-4 tracking-wide font-bold">about me</h1>
        <Paragragh>
          I'm a software Engineer from India. A javascript enthusiast and blogger specialising in full-stack
          development.
        </Paragragh>
        <Paragragh>
          Happy to be part of the Gifta developer team at{' '}
          <a href="https://cimpress.com/" className="text-white font-bold hover:underline underline-offset-4">
            Cimpress
          </a>
          , a B2C e-commerce platform where I helped integrate designer experience(DEX) package with the website and
          developed full-stack microservices.
        </Paragragh>
        <Paragragh>
          Before Cimpress, I worked as a Programmer Analyst at{' '}
          <a href="https://www.cognizant.com/in/en" className="text-white font-bold hover:underline underline-offset-4">
            Cognizant
          </a>
          . I was part of the R&D team, where I created and managed multiple POC websites and mobile apps and helped
          create reusable components.
        </Paragragh>
        <Paragragh>Outside of technology, I love spending time with my family and watching movies.</Paragragh>
        <Link href="/resume.pdf" passHref>
          <a
            className="border rounded-md px-4 py-2 mt-4 bg-white text-primary font-bold flex w-fit gap-2 items-center shadow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume.pdf <DownloadIcon />
          </a>
        </Link>
      </section>
      <section
        id="work"
        className="pt-20 sm:pt-36 flex justify-center flex-col text-base tracking-wide md:tracking-wider text-gray-400/90"
      >
        <h1 className="uppercase pb-4 tracking-wide font-bold">work</h1>
        <div className="pb-4 leading-relaxed">
          <h1 className="pb-2 uppercase text-white font-bold">Cimpress</h1>
          <div className="flex pb-2 justify-between md:text-lg ">
            <p>Software Engineer</p>
            <p>05/2021 - Current</p>
          </div>
        </div>
        <div className="pb-4 leading-relaxed">
          <h1 className="pb-2 uppercase text-white font-bold">Cognizant</h1>
          <div className="flex justify-between pb-2 md:text-lg ">
            <p>Programmer Analyst</p>
            <p>07/2019 - 04/2021</p>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
};

export default Home;
