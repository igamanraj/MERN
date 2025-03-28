export const Home = () => {
  return (
    <>
      <main>
        {/* first section  */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the World best IT Company</p>
              <h1>Welcome to Technical</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorum temporibus voluptatem ipsa culpa ad, veritatis nisi, quo
                accusantium nulla quas non earum eos sunt iste aliquid magni
                cupiditate dolore commodi quis.
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/services">
                  <button className="secondary-btn">Learn more</button>
                </a>
              </div>
            </div>
            <div className="hero-images">
              <img src="/images/home.png" alt="hero" width={500} height={500} />
            </div>
          </div>
        </section>

        {/* second section  */}
        <section className="section-analytics">
          <div className="container grid grid-four-cols">
            <div className="div">
              <h2>50+</h2>
              <p>registered comapanies</p>
            </div>
            <div className="div">
              <h2>10000+</h2>
              <p>Happy Clients</p>
            </div>
            <div className="div">
              <h2>500+</h2>
              <p>well known developers</p>
            </div>
            <div className="div">
              <h2>24/7</h2>
              <p>service</p>
            </div>
          </div>
        </section>
        {/* third section  */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-images">
              <img src="/images/design.png" alt="hero" width={500} height={500} />
            </div>
            <div className="hero-content">
              <p>We are here to help</p>
              <h1>Get Started Today</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorum temporibus voluptatem ipsa culpa ad, veritatis nisi, quo
                accusantium nulla quas non earum eos sunt iste aliquid magni
                cupiditate dolore commodi quis.
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/services">
                  <button className="secondary-btn">Learn more</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
