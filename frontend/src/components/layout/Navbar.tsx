import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";
import prism from "../../assets/prism.png";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="navbar">
            <div className="navbar-container">
                <a href="/" className="logo">
                    <img src={prism} alt="Prism" />
                    <span>Prism</span>
                </a>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <a href="#features">Features</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#usecases">Customers</a>
                    <a href="#problem">Use Cases</a>
                </nav>

                <div className="actions desktop-nav">
                    <Link to="/login" className="login">
                        Login
                    </Link>
                    <Link to="/register" className="get-started">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="mobile-menu-btn" 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <div className={`mobile-nav ${isOpen ? "open" : ""}`}>
                <nav>
                    <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
                    <a href="#pricing" onClick={() => setIsOpen(false)}>Pricing</a>
                    <a href="#usecases" onClick={() => setIsOpen(false)}>Customers</a>
                    <a href="#problem" onClick={() => setIsOpen(false)}>Use Cases</a>
                </nav>
                <div className="actions">
                    <Link to="/login" className="login" onClick={() => setIsOpen(false)}>
                        Login
                    </Link>
                    <Link to="/register" className="get-started" onClick={() => setIsOpen(false)}>
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}