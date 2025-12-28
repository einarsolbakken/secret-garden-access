import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, Volume2, VolumeX } from "lucide-react";
import Snowfall from "./Snowfall";

interface AccessGateProps {
  onAccessGranted: () => void;
}

const ACCESS_CODE = "JUL2024";

const AccessGate = ({ onAccessGranted }: AccessGateProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.toUpperCase() === ACCESS_CODE) {
      localStorage.setItem("access_granted", "true");
      onAccessGranted();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/christmas-background.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      <Snowfall />
      
      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20 p-3 sm:p-4 rounded-full bg-background/20 backdrop-blur-sm border border-white/20 text-white hover:bg-background/30 transition-all duration-300"
        aria-label={isMuted ? "Slå på lyd" : "Slå av lyd"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>
      
      {/* Christmas decorations - smaller on mobile */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 text-2xl sm:text-4xl opacity-80 animate-pulse z-10">🎄</div>
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 text-2xl sm:text-4xl opacity-80 animate-pulse z-10" style={{ animationDelay: '0.5s' }}>🎅</div>
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-xl sm:text-3xl opacity-70 z-10">🎁</div>
      
      {/* Content */}
      <div 
        className={`relative z-10 w-full max-w-md mx-3 sm:mx-4 opacity-0 animate-fade-in ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        style={{ animationDelay: '0.2s' }}
      >
        <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border-primary/20">
          {/* Christmas tree icon */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl animate-pulse" />
              <div className="relative text-5xl sm:text-6xl">🎄</div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-2 sm:mb-3">
              God Jul! 🎅
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm tracking-wide px-2">
              Skriv inn din tilgangskode for å se juleprogrammet
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="• • • • • • • •"
                className={`access-input h-12 sm:h-14 rounded-lg text-base ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/50' : ''}`}
                autoFocus
              />
              
              {error && (
                <div className="flex items-center justify-center gap-2 text-destructive text-xs sm:text-sm animate-fade-in">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Feil kode! Prøv igjen 🎅</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="btn-primary w-full h-11 sm:h-12 rounded-lg text-sm group"
              disabled={!code.trim()}
            >
              <span>Åpne Julegaven</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          {/* Hint */}
          <p className="text-center text-muted-foreground/60 text-xs mt-6 sm:mt-8 tracking-wide">
            Hint: JUL2024 🎁
          </p>
        </div>

        {/* Decorative corners with Christmas colors - hidden on very small screens */}
        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-lg hidden xs:block" />
        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-accent/50 rounded-tr-lg hidden xs:block" />
        <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-accent/50 rounded-bl-lg hidden xs:block" />
        <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-primary/50 rounded-br-lg hidden xs:block" />
      </div>

      {/* Shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
};

export default AccessGate;
