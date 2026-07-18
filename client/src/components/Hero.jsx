import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import heroOverlayImg from '../assets/hero-video/hero-image/hero.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const circleRef = useRef(null);
  const bgTextRef = useRef(null);
  const topLayerRef = useRef(null);

  // Cinematic Reveal Refs
  const revealCanvasRef = useRef(null);
  const revealMaskCanvasRef = useRef(null);
  const heroOverlayObj = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  const imagesRef = useRef([]);
  const currentFrameRef = useRef({ index: 0 });

  // 1. Optimized Fast Asynchronous Preload
  useEffect(() => {
    const frameCount = 240;
    let loadedCount = 0;
    const images = new Array(frameCount);

    // Load first key frames immediately for fast interactive start
    const loadBatch = (start, end) => {
      for (let i = start; i <= end; i++) {
        const num = String(i).padStart(3, '0');
        const img = new Image();
        img.decoding = 'async';
        img.src = `/src/assets/hero-video/ezgif-frame-${num}.jpg`;

        img.onload = img.onerror = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
          if (loadedCount >= frameCount) {
            setIsLoaded(true);
          }
        };

        images[i - 1] = img;
      }
    };

    // Load first 30 frames instantly, then remainder asynchronously
    loadBatch(1, 30);
    setTimeout(() => loadBatch(31, frameCount), 50);

    imagesRef.current = images;

    // Overlay image preloading
    const overlayImg = new Image();
    overlayImg.decoding = 'async';
    overlayImg.src = heroOverlayImg;
    overlayImg.onload = () => { heroOverlayObj.current = overlayImg; };
    revealMaskCanvasRef.current = document.createElement('canvas');
  }, []);

  // 2. Canvas Rendering Logic
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: false });
    const img = imagesRef.current[index];

    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    const scale = canvasWidth / img.width;
    const x = 0;
    const y = (canvasHeight / 2) - (img.height / 2) * scale;

    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    if (revealCanvasRef.current) {
      revealCanvasRef.current.width = window.innerWidth * dpr;
      revealCanvasRef.current.height = window.innerHeight * dpr;
    }
    if (revealMaskCanvasRef.current) {
      revealMaskCanvasRef.current.width = window.innerWidth * dpr;
      revealMaskCanvasRef.current.height = window.innerHeight * dpr;
      const maskCtx = revealMaskCanvasRef.current.getContext('2d');
      if (maskCtx) {
        maskCtx.fillStyle = 'black';
        maskCtx.fillRect(0, 0, window.innerWidth * dpr, window.innerHeight * dpr);
      }
    }

    renderFrame(currentFrameRef.current.index);
  };

  // 3. GSAP Scroll Animation
  useGSAP(() => {
    if (!preloaderComplete) {
      document.body.style.overflow = 'hidden';
    }

    if (!isLoaded) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setPreloaderComplete(true);
        document.body.style.overflow = '';
      }
    });

    tl.to('.preloader-panel', {
      yPercent: 100,
      duration: 1.2,
      stagger: 0.08,
      ease: 'power4.inOut'
    })
      .fromTo('.hero-title',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.hero-cta',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

    handleResize();
    window.addEventListener('resize', handleResize);

    const frameCount = 240;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (frameCount - 1));
        if (frameIndex !== currentFrameRef.current.index) {
          currentFrameRef.current.index = frameIndex;
          requestAnimationFrame(() => renderFrame(frameIndex));
        }
      }
    });

    gsap.to(canvasRef.current, {
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    gsap.fromTo(circleRef.current,
      { scale: 0.9 },
      { scale: 1, duration: 1, ease: 'power3.out' }
    );

    // --- CINEMATIC LIGHT REVEAL LOOP ---
    const renderReveal = () => {
      if (!revealCanvasRef.current || !revealMaskCanvasRef.current || !heroOverlayObj.current) return;

      const canvas = revealCanvasRef.current;
      const maskCanvas = revealMaskCanvasRef.current;
      const ctx = canvas.getContext('2d', { alpha: true });
      const maskCtx = maskCanvas.getContext('2d', { alpha: true });

      const w = canvas.width;
      const h = canvas.height;

      if (!ctx || !maskCtx || w === 0 || h === 0) return;

      if (currentFrameRef.current.index < 150) {
        if (mouseRef.current.isActive) {
          ctx.clearRect(0, 0, w, h);
          maskCtx.globalCompositeOperation = 'source-over';
          maskCtx.fillStyle = 'black';
          maskCtx.fillRect(0, 0, w, h);
          mouseRef.current.isActive = false;
        }
        return;
      }

      mouseRef.current.isActive = true;

      maskCtx.globalCompositeOperation = 'source-over';
      maskCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      maskCtx.fillRect(0, 0, w, h);

      const { x, y } = mouseRef.current;
      if (x >= 0 && y >= 0) {
        maskCtx.globalCompositeOperation = 'destination-out';
        const radius = 250;
        const gradient = maskCtx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        maskCtx.fillStyle = gradient;
        maskCtx.beginPath();
        maskCtx.arc(x, y, radius, 0, Math.PI * 2);
        maskCtx.fill();
      }

      ctx.clearRect(0, 0, w, h);
      const img = heroOverlayObj.current;
      const scale = w / img.width;
      const imgY = (h / 2) - (img.height / 2) * scale;

      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(img, 0, imgY, img.width * scale, img.height * scale);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(maskCanvas, 0, 0);
    };

    gsap.ticker.add(renderReveal);

    const handleMouseMove = (e) => {
      const dpr = window.devicePixelRatio || 1;
      mouseRef.current.x = e.clientX * dpr;
      mouseRef.current.y = e.clientY * dpr;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const stickyViewport = containerRef.current.querySelector('.sticky');
    if (stickyViewport) {
      stickyViewport.addEventListener('mousemove', handleMouseMove);
      stickyViewport.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      gsap.ticker.remove(renderReveal);
      if (stickyViewport) {
        stickyViewport.removeEventListener('mousemove', handleMouseMove);
        stickyViewport.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, { scope: containerRef, dependencies: [isLoaded] });

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black">

      {/* GSAP Preloader */}
      {!preloaderComplete && (
        <div className="fixed inset-0 z-[200] flex w-full h-screen pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="preloader-panel h-full bg-[#141414] border-r border-[#222]"
              style={{ width: '16.666667%' }}
            />
          ))}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-white z-10 text-xs sm:text-sm font-medium tracking-widest uppercase opacity-60">
              <span className="text-primary font-bold mr-2">LOADING</span> {loadingProgress}%
            </div>
          )}
        </div>
      )}

      {/* Sticky Viewport */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
      >

        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover origin-center"
        />

        {/* Cinematic Reveal Canvas */}
        <canvas
          ref={revealCanvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none z-[2] hidden md:block"
        />

        {/* Creative Bold Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <h1
            ref={bgTextRef}
            className="text-[18vw] font-black text-primary tracking-tighter opacity-0 whitespace-nowrap"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            CREATIVE
          </h1>
        </div>

        {/* Top Layer Cutout Image */}
        <img
          ref={topLayerRef}
          src="/src/assets/hero-video/ezgif-frame-240.jpg"
          className="absolute inset-0 h-full w-full object-cover origin-center pointer-events-none z-[2] opacity-0"
          alt="Top Layer Cutout"
          loading="lazy"
          decoding="async"
        />

        {/* Circle Design Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <div
            ref={circleRef}
            className="absolute rounded-full border border-primary/60 h-[280px] w-[280px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] lg:h-[650px] lg:w-[650px]"
            style={{ borderWidth: '1px' }}
          ></div>
        </div>

        {/* BOTTOM CONTENT OVERLAY */}
        <div className="absolute bottom-0 left-0 w-full z-[10] px-6 sm:px-8 md:px-16 pb-8 sm:pb-12 flex flex-col pointer-events-auto">

          {/* Top Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-6 sm:mb-8 max-w-[1800px] mx-auto">

            {/* LEFT COLUMN */}
            <div className="flex-1 mb-6 md:mb-0">
              <div className="w-10 h-[2px] bg-primary mb-4 sm:mb-5"></div>
              <h1 className="hero-title opacity-0 text-white text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-1.5 leading-tight">
                Hello, I'm <span className="text-primary block sm:inline font-black">Aakash</span>
              </h1>
              <p className="hero-subtitle opacity-0 text-gray-300 text-sm sm:text-base md:text-lg font-medium tracking-wide">
                Aspiring Fullstack Developer
              </p>
            </div>

            {/* CENTER COLUMN */}
            <div className="hidden md:block flex-[2]"></div>

            {/* RIGHT COLUMN */}
            <div className="flex-1 flex justify-start md:justify-end">
              <a href="#projects" className="hero-cta opacity-0 group inline-flex flex-col items-start md:items-end">
                <div className="flex items-center text-primary text-[11px] sm:text-[12px] uppercase tracking-[2px] mb-2 transition-colors duration-300 group-hover:text-white">
                  <span className="mr-2">VIEW WORK</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </div>
                <div className="w-full h-[1px] bg-primary opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:bg-white"></div>
              </a>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="w-full max-w-[1800px] mx-auto flex flex-wrap items-center justify-between pt-6 sm:pt-8 border-t border-white/10 gap-4">

            {/* Social Links & Icons */}
            <div className="flex items-center space-x-6 sm:space-x-8">
              <a
                href="https://www.linkedin.com/in/aakash-kumar-10th/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-[2px] transition-colors duration-300 flex items-center space-x-1.5"
              >
                <i className="ri-linkedin-fill text-sm"></i>
                <span>LINKEDIN</span>
              </a>
              <a
                href="https://github.com/Aakash1dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-[2px] transition-colors duration-300 flex items-center space-x-1.5"
              >
                <i className="ri-github-fill text-sm"></i>
                <span>GITHUB</span>
              </a>
              <a
                href="https://x.com/aakash_dev_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-[2px] transition-colors duration-300 flex items-center space-x-1.5"
              >
                <i className="fab fa-x-twitter text-xs"></i>
                <span>TWITTER</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
