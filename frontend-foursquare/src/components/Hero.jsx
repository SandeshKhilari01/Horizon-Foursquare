import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.jpg";
import horizonBg from "../assets/Horizon-Background.jpg";

export default function Hero() {
  const images = [horizonBg, bg1, bg2, bg3, bg4];
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ Inline styles for button
  const buttonStyle = {
    padding: "14px 40px",
    backgroundColor: "0 0 10px rgba(255, 73, 22, 1)",
    color: "white",
    fontWeight: "bold",
    border: "1px solid orange",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "1.5rem",
    boxShadow: "0 0 10px rgba(136, 207, 6, 1)",
    transition: "all 0.3s ease-in-out",
  };

  const buttonHoverStyle = {
    transform: "scale(1.1)",
    boxShadow: "0 0 35px rgba(255, 183, 142, 1)",
  };

  return (
    <section
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
        color: "white",
        position: "relative",
        transition: "all 1s ease-in-out",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)",
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 10 }}>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontSize: "3.5rem",
            fontWeight: "900",
            marginBottom: "1rem",
          }}
        >
          Plan Your Perfect Trip with AI ✈️
        </motion.h1>

        <p
          style={{
            fontSize: "1.1rem",
            maxWidth: "650px",
            margin: "0 auto 1.5rem auto",
          }}
        >
          <Typewriter
            words={[
              "Create personalized journeys effortlessly, optimized for comfort, savings, and unforgettable travel memories worldwide.",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={20}
            delaySpeed={2000}
          />
        </p>

        {/* ✅ Button with inline hover effect */}
        <button
          onClick={() => navigate("/main")}
          style={buttonStyle}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, buttonHoverStyle)
          }
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Start Planning with Horizon
        </button>
      </div>
    </section>
  );
}
