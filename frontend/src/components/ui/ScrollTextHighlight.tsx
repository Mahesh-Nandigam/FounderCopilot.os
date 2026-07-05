import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const text = "The limit of what AI can do in your enterprise is not the model. It's what the model knows about how your enterprise operates. That context is only captured one way: doing the work.";

const ScrollTextHighlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const words = text.split(" ");

  return (
    <section 
      ref={containerRef} 
      style={{ 
        width: '100vw',
        background: '#0B121A',
        position: 'relative',
        zIndex: 10,
        padding: '120px 8vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(32px, 5vw, 68px)',
          lineHeight: '1.15',
          maxWidth: '1200px',
          textAlign: 'left',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          margin: 0
        }}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
    </section>
  );
};

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const color = useTransform(progress, range, ['#43505F', '#FFFFFF']);
  
  return (
    <span style={{ position: 'relative', display: 'inline-block', marginRight: '0.25em', marginTop: '0.1em' }}>
      <motion.span style={{ color }}>
        {children}
      </motion.span>
    </span>
  );
};

export default ScrollTextHighlight;
