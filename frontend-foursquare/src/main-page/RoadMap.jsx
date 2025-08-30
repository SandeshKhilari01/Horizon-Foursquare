import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, ArrowRight, Star, Clock, Route } from 'lucide-react';

const AnimatedRoadmap = ({ title = "Your Journey", days = [] }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, days.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target);
          if (entry.isIntersecting && index !== -1) {
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [days]);

  // Auto-play animation for cards (pause when hovering)
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveCard((prev) => (prev === null ? 0 : (prev + 1) % days.length));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [days.length, isHovering]);

  // Handle scroll navigation when hovering
  useEffect(() => {
    const handleWheel = (e) => {
      if (isHovering && containerRef.current) {
        e.preventDefault();
        
        if (e.deltaY > 0) {
          // Scroll down - go to next day
          setActiveCard((prev) => {
            const nextCard = prev === null ? 0 : Math.min(prev + 1, days.length - 1);
            
            // Scroll to the next card
            if (itemRefs.current[nextCard]) {
              itemRefs.current[nextCard].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
              });
            }
            
            return nextCard;
          });
        } else {
          // Scroll up - go to previous day
          setActiveCard((prev) => {
            const prevCard = prev === null ? 0 : Math.max(prev - 1, 0);
            
            // Scroll to the previous card
            if (itemRefs.current[prevCard]) {
              itemRefs.current[prevCard].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
              });
            }
            
            return prevCard;
          });
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isHovering, days.length]);

  return (
    <div className="min-h-100 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-red-200/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-pink-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-orange-300/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-block">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-pulse text-black">{title} </h1>
            </div>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Route className="w-5 h-5 text-orange-600" />
                <span className="text-gray-700 font-medium">Total Journey: {days.length} Amazing Days</span>
              </div>
            </div>
          </div>
          
          {/* Decorative Line */}
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-8"></div>
        </div>

        {/* Horizontal Roadmap */}
        <div className="relative">
          {/* Progress Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 to-red-200 transform -translate-y-1/2 rounded-full">
            <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-2000 ease-out"
                 style={{ width: `${(visibleItems.length / days.length) * 100}%` }}></div>
          </div>

          <div className="overflow-x-auto pb-8 scrollbar-hide" 
               ref={containerRef}
               onMouseEnter={() => setIsHovering(true)}
               onMouseLeave={() => setIsHovering(false)}>
            <div className="flex space-x-6 md:space-x-12 min-w-max px-4">
              {days.map((day, index) => {
                const isVisible = visibleItems.includes(index);
                const isActive = activeCard === index;

                return (
                  <div
                    key={index}
                    className="relative flex-shrink-0"
                    ref={(el) => (itemRefs.current[index] = el)}
                  >
                    {/* Day Card */}
                    <div
                      className={`w-72 md:w-80 lg:w-96 transition-all duration-1000 ${
                        isVisible
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-12'
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                      onMouseEnter={() => setActiveCard(index)}
                    >
                      <div className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 transform transition-all duration-700 hover:scale-105 ${
                        isVisible ? 'scale-100' : 'scale-90'
                      } ${isActive ? 'shadow-3xl scale-105' : ''}`}>
                        
                        {/* Glowing Border Animation */}
                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 opacity-0 transition-opacity duration-500 ${
                          isActive ? 'opacity-20' : ''
                        }`}></div>
                        
                        {/* Day Number with Enhanced Animation */}
                        <div className="relative flex items-center justify-center mb-6">
                          <div className={`relative ${isActive ? 'animate-bounce' : ''}`}>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-md opacity-70"></div>
                            <span className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg flex items-center gap-2">
                              <Calendar className="w-5 h-5" />
                              Day {index + 1}
                            </span>
                          </div>
                        </div>
                        
                        {/* Location Pin Animation */}
                        <div className="flex justify-center mb-4">
                          <div className={`transform transition-all duration-500 ${
                            isActive ? 'animate-pulse scale-110' : ''
                          }`}>
                            <MapPin className="w-8 h-8 text-orange-600" />
                          </div>
                        </div>
                        
                        {/* Day Title with Gradient */}
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                          <span className="bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text">
                            {day.title}
                          </span>
                        </h3>
                        
                        {/* Day Subtitle */}
                        <p className="text-gray-600 text-center text-base md:text-lg leading-relaxed mb-6 px-2">
                          {day.subtitle}
                        </p>
                        
                        {/* Enhanced Progress Bar with Multiple Animations */}
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-red-200 opacity-50"></div>
                            <div 
                              className={`bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-1500 relative overflow-hidden ${
                                isVisible ? 'w-full' : 'w-0'
                              }`}
                              style={{ transitionDelay: `${index * 150 + 600}ms` }}
                            >
                              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-ping"></div>
                            </div>
                          </div>
                        </div>

                        {/* Status Indicator */}
                        <div className="flex justify-center">
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            isVisible 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              isVisible ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                            }`}></div>
                            {isVisible ? 'Ready to Explore' : 'Coming Up'}
                          </div>
                        </div>

                        {/* Floating Particles Effect */}
                        {isActive && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                            <div className="absolute bottom-4 left-4 w-1 h-1 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Connecting Arrow */}
                    {index < days.length - 1 && (
                      <div className="absolute top-1/2 -right-6 md:-right-12 transform -translate-y-1/2 z-20">
                        <div className={`transition-all duration-700 ${
                          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`} style={{ transitionDelay: `${index * 150 + 300}ms` }}>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
                            <div className="relative bg-white rounded-full p-3 shadow-lg">
                              <ArrowRight className="w-6 h-6 text-orange-600 animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Main Roadmap component with test input
const RoadMap = () => {
  const [title, setTitle] = useState("");
  const [days, setDays] = useState([]);

  useEffect(() => {
    // ===== TEST INPUT: Provide roadmap title and days here =====
    const testData = {
      title: "Travelling plan with horizon", // Roadmap title
      days: [
        { title: "Pune Building", subtitle: "Set up your workout space and establish basic routines" },
        { title: "Mumbai Focus", subtitle: "Begin strength training exercises and build muscle memory" },
        { title: "Cardio Integration", subtitle: "Add cardiovascular exercises to improve endurance" },
        { title: "Delhi Training", subtitle: "Incorporate stretching and mobility work into routine" },
        { title: "jammu Peak", subtitle: "Combine all elements for maximum fitness results" }
      ]
    };

    setTitle(testData.title);
    setDays(testData.days);
  }, []);

  return <AnimatedRoadmap title={title} days={days} />;
};

export default RoadMap;