import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SplineScene } from "../components/ui/splite";
import { Card } from "../components/ui/card";
import { Spotlight } from "../components/ui/spotlight";
import { Network, Scale, CircleDollarSign, Rocket, Smile, Sparkles, Zap, TrendingUp, Clock, Shield } from 'lucide-react';
import ScrollTextHighlight from '../components/ui/ScrollTextHighlight';

const GithubIcon = ({ color = 'currentColor', ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ color = 'currentColor', ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPointerRef = useRef(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    
    let points: { x: number, y: number, age: number }[] = [];
    let mouse = { x: -1000, y: -1000 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement;
      isPointerRef.current = (window.getComputedStyle(target).cursor === 'pointer' || target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a');
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    let animationFrameId: number;
    let lastTime = performance.now();
    
    const render = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      
      if (mouse.x !== -1000) {
        points.push({ x: mouse.x, y: mouse.y, age: 0 });
      }
      
      points.forEach(p => p.age += dt);
      points = points.filter(p => p.age < 800);
      
      ctx.clearRect(0, 0, width, height);
      
      const gridSize = 15; 
      
      let minX = width, maxX = 0, minY = height, maxY = 0;
      let hasActivePoints = false;
      
      const maxDist = 60;
      const maxDistSq = maxDist * maxDist;
      
      points.forEach(p => {
        minX = Math.min(minX, p.x - maxDist);
        maxX = Math.max(maxX, p.x + maxDist);
        minY = Math.min(minY, p.y - maxDist);
        maxY = Math.max(maxY, p.y + maxDist);
        hasActivePoints = true;
      });
      
      if (hasActivePoints) {
        minX = Math.max(0, Math.floor(minX / gridSize) * gridSize);
        maxX = Math.min(width, Math.ceil(maxX / gridSize) * gridSize);
        minY = Math.max(0, Math.floor(minY / gridSize) * gridSize);
        maxY = Math.min(height, Math.ceil(maxY / gridSize) * gridSize);
        
        for (let x = minX; x <= maxX; x += gridSize) {
          for (let y = minY; y <= maxY; y += gridSize) {
            let maxInfluence = 0;
            
            for (let i = 0; i < points.length; i++) {
              const p = points[i];
              const dx = x - p.x;
              const dy = y - p.y;
              const distSq = dx * dx + dy * dy;
              
              if (distSq < maxDistSq) {
                const normalizedDist = Math.sqrt(distSq) / maxDist;
                const easeDist = 1 - Math.pow(normalizedDist, 1.5);
                const ageFactor = Math.max(0, 1 - (p.age / 800));
                const easeAge = Math.pow(ageFactor, 1.2);
                const influence = Math.max(0, easeDist) * easeAge;
                if (influence > maxInfluence) {
                  maxInfluence = influence;
                }
              }
            }
            
            if (maxInfluence > 0.02) {
              ctx.beginPath();
              ctx.arc(x, y, maxInfluence * 4, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${maxInfluence * 0.8})`;
              ctx.fill();
            }
          }
        }
      }
      
      ctx.beginPath();
      const isPointer = isPointerRef.current;
      ctx.arc(mouse.x, mouse.y, isPointer ? 10 : 4, 0, Math.PI * 2);
      ctx.fillStyle = isPointer ? 'rgba(255,255,255,0.2)' : 'white';
      ctx.fill();
      if (isPointer) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
};

// Falling Orange Sprinkles (Stars)
const Sprinkles = () => {
  const [sprinkles, setSprinkles] = useState<{ id: number, left: number, duration: number, delay: number, size: number, opacity: number }[]>([]);

  useEffect(() => {
    const newSprinkles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * -20,
      size: 1 + Math.random() * 2,
      opacity: 0.4 + Math.random() * 0.6
    }));
    setSprinkles(newSprinkles);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {sprinkles.map(s => (
        <div 
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top: '-10px',
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: '#fb923c', // Warm orange color
            borderRadius: '50%',
            opacity: s.opacity,
            animation: `fall ${s.duration}s linear infinite`,
            animationDelay: `${s.delay}s`,
            boxShadow: '0 0 10px rgba(251, 146, 60, 0.8)' // Glowing orange shadow
          }}
        />
      ))}
    </div>
  );
};

const agentsList = [
  { name: 'Github Agent', icon: GithubIcon, color: '#f472b6' }, // Pink
  { name: 'LinkedIn Agent', icon: LinkedinIcon, color: '#60a5fa' }, // Blue
  { name: 'Main Orchestrator', icon: Network, color: '#fef3c7' }, // Cream
  { name: 'Legal Advisor', icon: Scale, color: '#f472b6' }, // Pink
  { name: 'Fundraiser', icon: CircleDollarSign, color: '#60a5fa' }, // Blue
  { name: 'GTM Agent', icon: Rocket, color: '#fef3c7' }, // Cream
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-on-scroll');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hide-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'black', overflowX: 'hidden', position: 'relative', cursor: 'none' }}>
      <CustomCursor />
      
      {/* Global Fixed Background Effects */}
      <Sprinkles />
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
          
          button, a, input {
            cursor: none !important;
          }

          @keyframes floatText {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }

          @keyframes text-shine {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }

          .shine-text {
            background: linear-gradient(90deg, #a1a1aa 0%, #a1a1aa 40%, #ffffff 50%, #a1a1aa 60%, #a1a1aa 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: text-shine 3s linear infinite;
          }

          .shine-text-pink {
            background: linear-gradient(90deg, #f472b6 0%, #f472b6 40%, #ffffff 50%, #f472b6 60%, #f472b6 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: text-shine 3s linear infinite;
          }

          .shine-text-white {
            background: linear-gradient(90deg, rgba(255,255,255,0.5) 0%, #ffffff 40%, #ffffff 60%, rgba(255,255,255,0.5) 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: text-shine 3s linear infinite;
          }

          @keyframes dynamic-avatar {
            0%, 100% { 
              transform: translateY(0) rotate(0deg) scale(1); 
              filter: drop-shadow(0 0 10px rgba(255,255,255,0.3)); 
            }
            33% { 
              transform: translateY(-12px) rotate(-15deg) scale(1.15); 
              filter: drop-shadow(0 0 30px rgba(255,255,255,1)); 
            }
            66% { 
              transform: translateY(6px) rotate(15deg) scale(0.95); 
              filter: drop-shadow(0 0 15px rgba(255,255,255,0.5)); 
            }
          }

          .animate-dynamic-avatar {
            animation: dynamic-avatar 3.5s ease-in-out infinite;
          }

          @keyframes fall {
            0% { transform: translateY(-100px); }
            100% { transform: translateY(120vh); }
          }
          
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          .marquee-content {
            display: inline-flex;
            gap: 80px;
            padding-right: 80px;
            animation: marquee 25s linear infinite;
          }
          
          .marquee-content:hover {
            animation-play-state: paused;
          }

          .floating-tagline {
            animation: floatText 4s ease-in-out infinite;
          }

          .hide-on-scroll {
            opacity: 0;
            transform: translateY(40px);
            transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .show-on-scroll {
            opacity: 1;
            transform: translateY(0);
          }
          
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #000; }
          ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #555; }
          
          @keyframes rainbow-glow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .rainbow-glow-btn {
            background: #ffffff;
            color: #000000;
            border: none;
            position: relative;
            z-index: 1;
            transition: transform 0.3s ease;
          }

          .rainbow-glow-btn::before {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 10%;
            right: 10%;
            height: 30px;
            background: linear-gradient(90deg, 
              hsl(0, 100%, 63%), 
              hsl(270, 100%, 63%), 
              hsl(210, 100%, 63%), 
              hsl(195, 100%, 63%), 
              hsl(90, 100%, 63%),
              hsl(0, 100%, 63%)
            );
            background-size: 200% 200%;
            filter: blur(20px);
            z-index: -1;
            opacity: 0.9;
            border-radius: 100px;
            animation: rainbow-glow 3s linear infinite;
            transition: all 0.3s ease;
          }
          
          .rainbow-glow-btn:hover {
            transform: translateY(-2px);
          }
          
          .rainbow-glow-btn:hover::before {
            opacity: 1;
            filter: blur(25px);
            bottom: -20px;
          }

          @keyframes border-shine {
            0% { border-color: rgba(255, 255, 255, 0.1); box-shadow: 0 0 5px rgba(255, 255, 255, 0.05); }
            50% { border-color: rgba(255, 255, 255, 0.5); box-shadow: 0 0 15px rgba(255, 255, 255, 0.2); }
            100% { border-color: rgba(255, 255, 255, 0.1); box-shadow: 0 0 5px rgba(255, 255, 255, 0.05); }
          }

          .shining-border {
            animation: border-shine 3s infinite alternate;
          }
        `}
      </style>

      {/* SECTION 1: The Spline Hero (First Scroll) */}
      <Card className="w-full h-[100vh] bg-transparent relative overflow-hidden border-none rounded-none z-10">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        <div className="relative w-full h-[100vh] overflow-hidden z-20">
          
          {/* Top Left Header / Navbar */}
          <div className="absolute top-8 left-[5vw] md:left-[5vw] z-50 flex items-center gap-3">
            <Sparkles size={28} className="text-white" />
            <span className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>FounderCopilot.os</span>
          </div>

          {/* Main Content Left */}
          <div className="absolute top-[18vh] left-[5vw] md:left-[5vw] z-40 pointer-events-none flex flex-col items-start w-full max-w-2xl">
            
            {/* Pill */}
            <div className="mb-4 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <Sparkles size={14} className="text-white/80" />
              <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">AI Agent for Founders</span>
            </div>

            {/* Main Title */}
            <h1 style={{ 
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(56px, 6vw, 96px)', 
              fontWeight: 800, 
              color: '#ffffff',
              letterSpacing: '-0.03em', 
              lineHeight: 1.1, 
              marginBottom: '16px'
            }}>
              FounderCopilot.os
            </h1>

            {/* Subtitle (Statement 1) */}
            <p className="text-white" style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: 'clamp(28px, 3.5vw, 44px)', 
              lineHeight: 1.2, 
              fontWeight: 600, 
              letterSpacing: '-0.01em',
              marginBottom: '16px'
            }}>
              Turns hours of work into <span className="text-white font-bold shine-text-white">seconds of execution.</span>
            </p>

            {/* Description (Statements 2 & 3) */}
            <div style={{ marginBottom: '24px' }}>
              <p className="text-white/60" style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', lineHeight: 1.6, fontWeight: 400, maxWidth: '420px' }}>
                Your always-on AI co-founder.<br/>
                Plan, hire, iterate, scale faster than ever before.
              </p>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-4 gap-4 w-full pointer-events-auto max-w-4xl" style={{ marginTop: '0px' }}>
              <div className="shining-border flex flex-col items-center justify-center p-6 rounded-3xl border-2 bg-black/40 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105">
                <Zap size={28} className="text-white mb-4 drop-shadow-md" />
                <span className="text-white font-bold text-3xl mb-1">10x</span>
                <span className="text-white/90 text-xs font-semibold mb-3 text-center whitespace-nowrap">Faster Execution</span>
                <span className="text-white/50 text-[11px] text-center leading-snug">Ship more, in less<br/>time.</span>
              </div>
              
              <div className="shining-border flex flex-col items-center justify-center p-6 rounded-3xl border-2 bg-black/40 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105" style={{ animationDelay: '0.5s' }}>
                <TrendingUp size={28} className="text-white mb-4 drop-shadow-md" />
                <span className="text-white font-bold text-3xl mb-1">90%</span>
                <span className="text-white/90 text-xs font-semibold mb-3 text-center whitespace-nowrap">Growth</span>
                <span className="text-white/50 text-[11px] text-center leading-snug">Accelerate with<br/>AI-powered decisions.</span>
              </div>

              <div className="shining-border flex flex-col items-center justify-center p-6 rounded-3xl border-2 bg-black/40 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105" style={{ animationDelay: '1s' }}>
                <Clock size={28} className="text-white mb-4 drop-shadow-md" />
                <span className="text-white font-bold text-3xl mb-1">24/7</span>
                <span className="text-white/90 text-xs font-semibold mb-3 text-center whitespace-nowrap">Always On</span>
                <span className="text-white/50 text-[11px] text-center leading-snug">Working for you,<br/>every second.</span>
              </div>

              <div className="shining-border flex flex-col items-center justify-center p-6 rounded-3xl border-2 bg-black/40 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105" style={{ animationDelay: '1.5s' }}>
                <Shield size={28} className="text-white mb-4 drop-shadow-md" />
                <span className="text-white font-bold text-3xl mb-1">Secure</span>
                <span className="text-white/90 text-xs font-semibold mb-3 text-center whitespace-nowrap">Privacy First</span>
                <span className="text-white/50 text-[11px] text-center leading-snug">Enterprise-grade<br/>security.</span>
              </div>
            </div>
          </div>

          {/* Background content (Robot) with full freedom */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 pointer-events-none" />
            
            {/* Robot container: oversized width so it catches all mouse events across the screen, but positioned so its center (the robot) is pushed to the right. */}
            <div 
              className="absolute top-0 bottom-0 pointer-events-auto mt-10 md:mt-16 flex items-center justify-center" 
              style={{ left: '-10vw', width: '175vw' }}
            >
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* SECTION 2: Minimal Text & Big Blue Button */}
      <section style={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px', background: 'transparent', zIndex: 10, position: 'relative' }}>
        
        <div className="hide-on-scroll text-center max-w-4xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 800, color: 'white', marginBottom: '64px', letterSpacing: '-1px', lineHeight: 1.1 }}>
            An automated AI system designed for solo - CEO's
          </h2>
          
          <button 
            onClick={() => navigate('/dashboard')} 
            className="rainbow-glow-btn" 
            style={{ 
              padding: '20px 48px', 
              fontSize: '22px', 
              borderRadius: '100px', 
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.5px'
            }}
          >
            Get into the circle
          </button>
        </div>
      </section>

      {/* SECTION 3: Animated Text Scroll (Replaced Image/Video) */}
      <ScrollTextHighlight />

      {/* SECTION 4: HappyRobot Inspired Video Section */}
      <section style={{ 
        height: '100vh', 
        width: '100vw', 
        position: 'relative', 
        zIndex: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
            filter: 'brightness(0.9)'
          }}
        >
          <source src="https://happyrobot.b-cdn.net/HappyRobot_HeroLoop_v01_up.mp4" type="video/mp4" />
        </video>



        {/* Center Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4" style={{ marginTop: '40px' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(48px, 8vw, 110px)',
            color: '#ececec',
            lineHeight: 1.0,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            maxWidth: '1400px',
            marginBottom: '40px'
          }}>
            Put agents to work in<br />complex environments
          </h2>
          <button 
            onClick={() => navigate('/dashboard')}
            className="transition-all hover:bg-white/10" 
            style={{
              background: '#0a0a0a',
              color: '#ececec',
              padding: '14px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            Book a demo
          </button>
        </div>
      </section>

      {/* SECTION 5: Meet our agents (Marquee) */}
      <section style={{ 
        minHeight: '60vh', 
        width: '100vw', 
        background: '#000', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '120px 0',
        position: 'relative',
        zIndex: 20 
      }}>
        <h3 className="hide-on-scroll" style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: 'clamp(40px, 6vw, 80px)', 
          color: '#fff', 
          marginBottom: '100px',
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '1px'
        }}>
          Meet our agents
        </h3>
        
        <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
          {/* Fade overlays for the edges */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, #000 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, #000 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />
          
          <div className="marquee-content" style={{ display: 'inline-flex', alignItems: 'center' }}>
            {/* Duplicated for infinite scrolling effect */}
            {[...agentsList, ...agentsList].map((agent, i) => (
              <div 
                key={i} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                  padding: '10px 20px',
                  borderRadius: '100px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <agent.icon size={36} color={agent.color} style={{ filter: `drop-shadow(0 0 10px ${agent.color})` }} />
                <span style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: '32px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}>
                  {agent.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
