import "./Home.css"

export const Home = () => {


  return (
    <>
      <main className="main-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="hero-subtitle">Leading Digital Innovation</p>
            <h1 className="hero-title">Transform Your Business with Advanced Technology</h1>
            <p className="hero-description">
              We deliver cutting-edge solutions that drive growth and efficiency. 
              Our expert team specializes in modern web development, cloud solutions, 
              and digital transformation strategies that help businesses thrive in 
              the digital age.
            </p>
            <div className="hero-actions">
              <a href="/contact" className="btn-primary">
                Get Started
              </a>
              <a href="/services" className="btn-secondary">
                View Services
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/images/home.png" alt="Technology Solutions" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card">
            <h3 className="stat-number">200+</h3>
            <p className="stat-label">Projects Completed</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">15K+</h3>
            <p className="stat-label">Satisfied Clients</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">100+</h3>
            <p className="stat-label">Expert Developers</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">24/7</h3>
            <p className="stat-label">Support Available</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container about-grid">
          <div className="about-visual">
            <img src="/images/design.png" alt="Innovation" className="about-image" />
          </div>
          <div className="about-content">
            <p className="about-subtitle">Why Choose Us</p>
            <h2 className="about-title">Building Tomorrow's Solutions Today</h2>
            <p className="about-description">
              With over a decade of experience in software development, we combine 
              innovative thinking with proven methodologies. Our team stays ahead 
              of technology trends to deliver solutions that not only meet today's 
              needs but also prepare your business for future challenges.
            </p>
            <div className="about-actions">
              <a href="/contact" className="btn-primary">
                Start Your Project
              </a>
              <a href="/portfolio" className="btn-secondary">
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};
