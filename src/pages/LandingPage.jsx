import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src="/assets/img/logo.png" alt="Logo" />
        </div>
        <div className={styles.navLinks}>
          <button
            onClick={() => navigate("/login")}
            className={styles.loginBtn}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className={styles.registerBtn}
          >
            Register
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.heroSection}>
          <h1>Welcome to Hair Care Management</h1>
          <p>
            Your comprehensive solution for hair health analysis and management
          </p>
          <button
            onClick={() => navigate("/register")}
            className={styles.ctaButton}
          >
            Get Started
          </button>
        </div>

        <div className={styles.featuresSection}>
          <div className={styles.featureCard}>
            <i className="fas fa-chart-line"></i>
            <h3>Advanced Analysis</h3>
            <p>
              Get detailed insights about your hair health with our advanced
              analysis tools
            </p>
          </div>
          <div className={styles.featureCard}>
            <i className="fas fa-user-md"></i>
            <h3>Expert Consultation</h3>
            <p>Connect with hair care specialists for personalized advice</p>
          </div>
          <div className={styles.featureCard}>
            <i className="fas fa-file-medical"></i>
            <h3>Digital Reports</h3>
            <p>
              Access your comprehensive hair analysis reports anytime, anywhere
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>Contact Us</h4>
            <p>Email: support@haircare.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Hair Care Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
