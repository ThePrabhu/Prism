import "./Navbar.css";

import prism from "../../assets/prism.png";

export default function Navbar() {
    return (
        <header className="navbar">

            <div className="navbar-container">

                <a
                    href="/"
                    className="logo"
                >
                    <img
                        src={prism}
                        alt="Prism"
                    />

                    <span>Prism</span>

                </a>

                <nav>

                    <a href="#problem">
                        Problem
                    </a>

                    <a href="#features">
                        Features
                    </a>

                    <a href="#usecases">
                        Use Cases
                    </a>

                    <a href="#pricing">
                        Pricing
                    </a>

                </nav>

                <div className="actions">

                    <button className="login">

                        Login

                    </button>

                    <button className="cta">

                        Get Started

                    </button>

                </div>

            </div>

        </header>
    );
}