import { useState, useEffect, useCallback } from "react";
import "./styles/navbar.css";
import logoImage from "../assets/logo1.png";
import { redirect, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollY = 0;

  // Debounced resize event
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setIsOpen(false); // Close sidebar on desktop switch
    }
  }, []);

  useEffect(() => {
    const debounceResize = setTimeout(() => {
      handleResize();
    }, 150); // Debounce time for resize

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(debounceResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // Handle scroll event for hiding and showing the navbar
  const handleScroll = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); // Scroll Down
    } else {
      setShowNavbar(true); // Scroll Up
    }
    lastScrollY = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMenu = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const scrollToSection = useCallback((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const EventSection = useCallback(() => {
    if (window.location.pathname === "/") {
      scrollToSection("events-section");
    } else {
      navigate("events");
    }
  }, [navigate, scrollToSection]);
  const TimeLineSection = useCallback(() => {
    if (window.location.pathname === "/") {
      scrollToSection("timeline");
      localStorage.setItem("eventname","All");
    }
    else{
      navigate("/");
      // scrollToSection("timeline");
      localStorage.setItem("eventname","All");
    } 
  }, [navigate, scrollToSection]);
  const TeamSection = useCallback(() => {
    if (window.location.pathname === "/") {
      scrollToSection("team-section");
    }
    else{
      navigate("/");
      // scrollToSection("timeline");
    } 
  }, [navigate, scrollToSection]);
  return (
    <header className={`navbar ${showNavbar ? "show" : "hide"}`}>
      {/* 🔥 Made the logo clickable to navigate to home */}
      <img
        src={logoImage}
        alt="PRAKARSH Logo"
        className="logo"
        onClick={() => {
          navigate("/");
          window.scrollTo(0, 0);
        }}
        style={{ cursor: "pointer" }} // 🔥 Added pointer cursor for better UX
      />

      {/* Desktop Navbar */}
      <nav className="nav-links">
        <ul>
          <li
            className="nav-item"
            onClick={() => {
              navigate("/");
              localStorage.setItem("eventname","All");
              window.scrollTo(0, 0);
            }}
          >
            HOME
          </li>
          <li className="nav-item" onClick={() => {navigate("/aboutus"); localStorage.setItem("eventname","All");}}>
            ABOUT
          </li>
          <li className="nav-item" onClick={EventSection}>
            EVENTS
          </li>
          <li className="nav-item" id="timeline-section"  onClick={TimeLineSection}>TIMELINE</li>
              
              <li className="nav-item" onClick= {TeamSection}>
            TEAM
          </li>
        </ul>
      </nav>

      {/* Hamburger Menu (Mobile Only) */}
      {isMobile && (
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}

      {/* Sidebar Menu (Mobile Only) */}
      {isMobile && (
        <div className={`sidebar ${isOpen ? "show" : ""}`}>
          <div className="close-btn" onClick={toggleMenu}>✖</div>
          <ul>
            <li
              className="nav-item"
              onClick={() => {
                toggleMenu();
                navigate("/");
                window.scrollTo(0, 0);
              }}
            >
              HOME
            </li>
            <li className="nav-item" onClick={() => { toggleMenu(); navigate("/aboutus"); localStorage.setItem("eventname","All"); }}>
              ABOUT
            </li>
            <li className="nav-item" onClick={() => { EventSection(); toggleMenu(); localStorage.setItem("eventname","All");}}>
              EVENTS
            </li>
            <li className="nav-item" onClick={() => { toggleMenu(); scrollToSection("timeline"); localStorage.setItem("eventname","All");}}>
              TIMELINE
            </li>
            <li className="nav-item" onClick={() => { toggleMenu(); scrollToSection("team-section"); localStorage.setItem("eventname","All"); }}>
              TEAM
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
