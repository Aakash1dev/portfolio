import logoImg from '../assets/logo.png'

function Footer() {
  return (
    <footer className="bg-darkBg text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <a
              href="#hero"
              className="inline-flex items-center hover:opacity-90 transition-opacity"
            >
              <img src={logoImg} alt="Logo" className="h-11 sm:h-12 w-auto object-contain" />
            </a>

            <p className="mt-2 text-gray-400 max-w-md text-xs sm:text-sm leading-relaxed">
              Building robust, high-performance digital experiences through well-structured code and efficient backend architecture.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs uppercase tracking-[2px] font-medium">
            <a href="#projects" className="text-gray-400 hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#skills" className="text-gray-400 hover:text-primary transition-colors">
              Skills
            </a>
            <a href="#contact" className="text-gray-400 hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>

        <hr className="border-white/10 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest gap-4">
          <p>&copy; 2026 Aakash Kumar. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <a
              href="https://www.linkedin.com/in/aakash-kumar-10th/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <i className="ri-linkedin-fill text-lg"></i>
            </a>
            <a
              href="https://github.com/Aakash1dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <i className="ri-github-fill text-lg"></i>
            </a>
            <a
              href="https://x.com/aakash_dev_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <i className="fab fa-x-twitter text-base"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
