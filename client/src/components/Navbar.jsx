import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const cvBtnRef = useRef(null);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    // Logo fade from left
    tl.fromTo(logoRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
    )
      // Links slide down
      .fromTo(linksRef.current,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'expo.out' },
        '-=0.6'
      )
      // Download CV button fade from right
      .fromTo(cvBtnRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.6'
      );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full h-[80px] z-[100] flex items-center justify-between px-6 sm:px-8 md:px-16 bg-transparent"
    >
      {/* LEFT: Logo Image */}
      <a
        href="#hero"
        ref={logoRef}
        className="relative z-10 flex items-center cursor-pointer transition-transform duration-500 hover:scale-[1.05]"
      >
        <img src={logoImg} alt="Logo" className="h-11 sm:h-12 w-auto object-contain" />
      </a>

      {/* RIGHT SIDE (Links + Download CV Button) */}
      <div className="relative z-10 flex items-center space-x-6 sm:space-x-8">

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-10">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              ref={el => linksRef.current[index] = el}
              href={link.href}
              className="text-white hover:text-primary text-[14px] sm:text-[15px] font-medium transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Download CV Button */}
        <div ref={cvBtnRef}>
          <a
            href="https://drive.google.com/file/d/19EgiDY-dvnmSbCXy3bYDQ6rueQwJIm05/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white text-[13px] sm:text-[15px] font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-primaryHover transition-all shadow-md hover:shadow-lg inline-block whitespace-nowrap"
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
