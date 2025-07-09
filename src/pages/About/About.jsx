import { useAuth } from "../../store/Auth";
import "./About.css";

export const About = () => {

  const {user} = useAuth();

  return (
    <>
      <main>
        <section className="hero-banner">
            <div className="wrapper layout-grid">
                <div className="content-block">
                    <p>{user ? `${user.username}, ` : ''}Discover Excellence, Experience Innovation</p>
                    <h1>Transform Your Digital Journey</h1>
                    <p>
                        Embark on a revolutionary digital experience where cutting-edge technology meets 
                        exceptional service. We craft solutions that don't just meet expectations—they 
                        exceed them, creating lasting impact for your business and customers.
                    </p>
                    <p>
                        Our team of passionate innovators combines years of expertise with fresh perspectives, 
                        delivering results that drive growth, enhance user engagement, and establish your 
                        brand as a leader in the digital landscape.
                    </p>
                    <p>
                        From concept to completion, we're your trusted partner in navigating the complexities 
                        of modern technology. Join thousands of satisfied clients who have transformed their 
                        vision into reality with our comprehensive solutions.
                    </p>
                    <p>
                        Ready to elevate your business to new heights? Let's create something extraordinary 
                        together and unlock the full potential of your digital presence in today's 
                        competitive marketplace.
                    </p>
                    <div className="action-buttons">
                        <a href="/contact">
                            <button className="primary-button">Get Started Today</button>
                        </a>
                        <a href="/services">
                            <button className="outline-button">Explore Services</button>
                        </a>
                    </div>
                </div>
                <div className="visual-content">
                    <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Digital Innovation" width="500" height="500" />
                </div>
            </div>
        </section>
    </main>
    </>
  )
};
