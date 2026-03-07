import React, { useEffect, useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { TribalPattern } from './TribalPattern';
import { ImagePlaceholder } from './ImagePlaceholder';
// Tribal Diamond SVG Pattern Component
function TribalDiamondBand({ className = '' }: {className?: string;}) {
  return (
    <svg
      className={className}
      width="100%"
      height="40"
      viewBox="0 0 200 40"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg">

      <defs>
        <pattern
          id="tribalDiamond"
          x="0"
          y="0"
          width="50"
          height="40"
          patternUnits="userSpaceOnUse">

          <path
            d="M25 2 L48 20 L25 38 L2 20 Z"
            fill="none"
            stroke="#1B4965"
            strokeWidth="1.5" />

          <path
            d="M25 8 L40 20 L25 32 L10 20 Z"
            fill="none"
            stroke="#4A7C59"
            strokeWidth="1.5" />

          <path
            d="M25 14 L32 20 L25 26 L18 20 Z"
            fill="#F59E0B"
            fillOpacity="0.3"
            stroke="#F59E0B"
            strokeWidth="1" />

          <line
            x1="0"
            y1="20"
            x2="2"
            y2="20"
            stroke="#1B4965"
            strokeWidth="1" />

          <line
            x1="48"
            y1="20"
            x2="50"
            y2="20"
            stroke="#1B4965"
            strokeWidth="1" />

        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tribalDiamond)" />
    </svg>);

}
// Corner Ornament SVG
function TribalCornerOrnament({
  position


}: {position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';}) {
  const rotations = {
    'top-left': 'rotate(0)',
    'top-right': 'rotate(90)',
    'bottom-right': 'rotate(180)',
    'bottom-left': 'rotate(270)'
  };
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      className="absolute z-20 pointer-events-none"
      style={{
        top: position.includes('top') ? '0' : 'auto',
        bottom: position.includes('bottom') ? '0' : 'auto',
        left: position.includes('left') ? '0' : 'auto',
        right: position.includes('right') ? '0' : 'auto',
        transform: rotations[position],
        transformOrigin: 'center'
      }}>

      <path
        d="M0 0 L60 0 L0 60 Z"
        fill="none"
        stroke="#1B4965"
        strokeWidth="1.5"
        opacity="0.4" />

      <path
        d="M0 0 L40 0 L0 40 Z"
        fill="none"
        stroke="#4A7C59"
        strokeWidth="1.5"
        opacity="0.5" />

      <path
        d="M0 0 L20 0 L0 20 Z"
        fill="#F59E0B"
        fillOpacity="0.2"
        stroke="#F59E0B"
        strokeWidth="1" />

      <path
        d="M8 8 L16 16 L8 24 L0 16 Z"
        fill="none"
        stroke="#1B4965"
        strokeWidth="1"
        opacity="0.6" />

    </svg>);

}
// Floating geometric accent
function FloatingDiamond({
  className = '',
  style



}: {className?: string;style?: React.CSSProperties;}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`z-20 pointer-events-none ${className}`}
      style={style}>

      <path
        d="M12 2 L22 12 L12 22 L2 12 Z"
        fill="none"
        stroke="#4A7C59"
        strokeWidth="1"
        opacity="0.3" />

      <path
        d="M12 6 L18 12 L12 18 L6 12 Z"
        fill="#F59E0B"
        fillOpacity="0.15"
        stroke="#F59E0B"
        strokeWidth="0.5" />

    </svg>);

}
export function HeroSection() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slides = [
  {
    id: 'samal',
    title: 'Samal Island',
    tagline: 'Crystal waters and pristine beaches await',
    location: 'Samal Island',
    imageText: 'Samal Island Beach'
    // image: '/images/samal.jpg'        // ← local file in /public/images/
    // // OR
    // image: 'https://example.com/samal.jpg'  // ← external URL
  },
  {
    id: 'tagum',
    title: 'Tagum City',
    tagline: 'The vibrant City of Palms',
    location: 'Tagum City',
    imageText: 'Tagum City Night Market'
    // image: '/images/samal.jpg'        // ← local file in /public/images/
    // // OR
    // image: 'https://example.com/samal.jpg'  // ← external URL
  },
  {
    id: 'talaingod',
    title: 'Talaingod',
    tagline: 'Rich indigenous culture and mountain trails',
    location: 'Talaingod',
    imageText: 'Ata-Manobo Village'
  },
  {
    id: 'kapalong',
    title: 'Kapalong',
    tagline: 'Caves, waterfalls, and untamed nature',
    location: 'Kapalong',
    imageText: 'Okbot Cave'
  },
  {
    id: 'new-corella',
    title: 'New Corella',
    tagline: "Nature's paradise of waterfalls and rivers",
    location: 'New Corella',
    imageText: 'Panas Waterfalls'

  }];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, slides.length]);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
  setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  return (
    <div
      className="relative bg-cream h-[600px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

      {/* Carousel Track - Background Layer */}
      <div
        className="absolute inset-0 flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`
        }}>

        {slides.map((slide) =>
        <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            <ImagePlaceholder
            height="h-full"
            text={slide.imageText}
            className="absolute inset-0" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>
        )}
      </div>

      {/* Content Layer - On Top of Carousel */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pt-16">
        {/* Badge */}
        <div className="inline-flex items-center px-5 py-2.5 rounded-full border-2 border-white/30 bg-black/30 backdrop-blur-sm text-white text-sm font-medium mb-8 shadow-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" className="mr-2">
            <path
              d="M8 1 L15 8 L8 15 L1 8 Z"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5" />

            <path
              d="M8 4 L12 8 L8 12 L4 8 Z"
              fill="#F59E0B"
              fillOpacity="0.8" />

          </svg>
          Discover Davao del Norte
        </div>

        {/* Logo */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg">
          <span className="text-ocean-100">Tribal</span>
          <span className="text-olive-200">Tours</span>
        </h1>

        {/* Tagline */}
        <div className="relative inline-block mb-6">
          <h2 className="text-2xl md:text-3xl font-light text-gray-200 italic drop-shadow-md">
            Where Every Journey Tells a Story
          </h2>
          <svg
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-3"
            viewBox="0 0 100 12">

            <path
              d="M0 6 L20 6 L25 2 L30 6 L40 6 L45 10 L50 6 L60 6 L65 2 L70 6 L80 6 L85 10 L90 6 L100 6"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5"
              opacity="0.8" />

          </svg>
        </div>

        {/* Current Slide Info */}
        <div className="mt-8 transform transition-all duration-500 translate-y-0 opacity-100">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {slides[currentSlide].title}
          </h3>
          <p className="text-xl text-gray-200 mb-8">
            {slides[currentSlide].tagline}
          </p>

          {/* <Button
            size="lg"
            className="px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all bg-ocean hover:bg-ocean/90 border-none"
            onClick={() =>
            navigate(
              `/tours?location=${encodeURIComponent(slides[currentSlide].location)}`
            )
            }>

            Explore {slides[currentSlide].title}
          </Button> */}
        </div>
      </div>

      {/* Top Tribal Border Band */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        <TribalDiamondBand className="opacity-60" />
        <TribalPattern className="mt-1" opacity={0.15} />
      </div>

      {/* Bottom Tribal Border Band */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <TribalPattern opacity={0.15} />
        <TribalDiamondBand className="opacity-60" />
      </div>

      {/* Corner Ornaments */}
      <TribalCornerOrnament position="top-left" />
      <TribalCornerOrnament position="top-right" />
      <TribalCornerOrnament position="bottom-left" />
      <TribalCornerOrnament position="bottom-right" />

      {/* Floating Diamond Accents */}
      <FloatingDiamond className="absolute top-24 left-[15%] animate-pulse" />
      <FloatingDiamond
        className="absolute top-40 right-[20%] animate-pulse"
        style={{
          animationDelay: '1s'
        }} />

      <FloatingDiamond
        className="absolute bottom-32 left-[25%] animate-pulse"
        style={{
          animationDelay: '2s'
        }} />

      <FloatingDiamond
        className="absolute bottom-24 right-[15%] animate-pulse"
        style={{
          animationDelay: '0.5s'
        }} />


      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-5"
        style={{
          backgroundImage: `radial-gradient(#1B4965 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />


      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
        aria-label="Previous slide">

        <ChevronLeftIcon className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
        aria-label="Next slide">

        <ChevronRightIcon className="w-8 h-8" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) =>
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-amber-500 w-8' : 'bg-white/50 hover:bg-white/80'}`}
          aria-label={`Go to slide ${index + 1}`} />

        )}
      </div>
    </div>);

}