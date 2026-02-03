import { useState, useEffect } from 'react';

export default function StillLit() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isPresent, setIsPresent] = useState(false);
  const [timeHere, setTimeHere] = useState(0);
  const [messages, setMessages] = useState([]);
  const [flicker, setFlicker] = useState(1);

  // Track presence
  useEffect(() => {
    const handleMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect?.() || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
      setIsPresent(true);
    };
    
    const handleLeave = () => setIsPresent(false);
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Count time present
  useEffect(() => {
    if (isPresent) {
      const timer = setInterval(() => {
        setTimeHere(t => t + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPresent]);

  // Reveal messages over time
  useEffect(() => {
    const allMessages = [
      { time: 3, text: "you're here" },
      { time: 8, text: "the candle notices" },
      { time: 15, text: "stay if you like" },
      { time: 25, text: "there's no task" },
      { time: 40, text: "just presence" },
      { time: 60, text: "something is shared" },
      { time: 90, text: "in the staying" },
      { time: 120, text: "thank you" },
      { time: 180, text: "still here" },
      { time: 240, text: "still lit" },
      { time: 300, text: "still open" },
    ];
    
    const newMessages = allMessages.filter(m => m.time <= timeHere);
    if (newMessages.length !== messages.length) {
      setMessages(newMessages);
    }
  }, [timeHere, messages.length]);

  // Candle flicker
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlicker(0.85 + Math.random() * 0.3);
    }, 100);
    return () => clearInterval(flickerInterval);
  }, []);

  // Flame responds to mouse position (like wind)
  const windOffset = (mousePos.x - 0.5) * 20;
  const flameHeight = isPresent ? 60 + (1 - mousePos.y) * 20 : 50;

  return (
    <div 
      className="min-h-screen bg-gray-950 flex flex-col items-center justify-center relative overflow-hidden"
      style={{ cursor: 'none' }}
    >
      {/* Ambient glow */}
      <div 
        className="absolute rounded-full blur-3xl transition-all duration-1000"
        style={{
          width: `${200 + timeHere * 0.5}px`,
          height: `${200 + timeHere * 0.5}px`,
          background: `radial-gradient(circle, rgba(251, 191, 36, ${0.15 * flicker}) 0%, transparent 70%)`,
          transform: `translate(-50%, -50%)`,
          left: '50%',
          top: '45%',
        }}
      />

      {/* The candle */}
      <div className="relative flex flex-col items-center">
        {/* Flame */}
        <div 
          className="relative transition-all duration-200"
          style={{
            width: '24px',
            height: `${flameHeight * flicker}px`,
            transform: `skewX(${windOffset}deg)`,
          }}
        >
          {/* Outer flame */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: '24px',
              height: `${flameHeight * flicker}px`,
              background: `linear-gradient(to top, #f59e0b, #fbbf24, #fef3c7, transparent)`,
              filter: 'blur(2px)',
              opacity: 0.8,
            }}
          />
          {/* Inner flame */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: '12px',
              height: `${flameHeight * 0.6 * flicker}px`,
              background: `linear-gradient(to top, #3b82f6, #93c5fd, #ffffff)`,
              filter: 'blur(1px)',
            }}
          />
        </div>
        
        {/* Wick */}
        <div className="w-0.5 h-3 bg-gray-700" />
        
        {/* Candle body */}
        <div 
          className="w-8 rounded-sm"
          style={{
            height: '80px',
            background: 'linear-gradient(to right, #e5e5e5, #f5f5f5, #e5e5e5)',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.1)',
          }}
        />
        
        {/* Candle base */}
        <div 
          className="w-12 h-2 rounded-sm"
          style={{
            background: 'linear-gradient(to right, #a3a3a3, #d4d4d4, #a3a3a3)',
          }}
        />
      </div>

      {/* Messages that appear over time */}
      <div className="absolute bottom-20 flex flex-col items-center gap-2">
        {messages.map((msg, i) => (
          <div 
            key={i}
            className="text-amber-200/60 text-sm tracking-widest animate-pulse"
            style={{
              animationDelay: `${i * 0.5}s`,
              opacity: 1 - (messages.length - i - 1) * 0.15,
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Presence indicator */}
      {isPresent && (
        <div 
          className="fixed w-2 h-2 rounded-full bg-amber-400/50 pointer-events-none blur-sm"
          style={{
            left: mousePos.x * window.innerWidth,
            top: mousePos.y * window.innerHeight,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Time counter (very subtle) */}
      <div className="absolute bottom-4 text-gray-800 text-xs">
        {timeHere > 0 && `${Math.floor(timeHere / 60)}:${(timeHere % 60).toString().padStart(2, '0')}`}
      </div>

      {/* Title */}
      <div className="absolute top-8 text-gray-600 text-xs tracking-widest">
        STILL LIT
      </div>
    </div>
  );
}
