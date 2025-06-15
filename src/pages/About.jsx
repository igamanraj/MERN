import { useAuth } from "../store/Auth";

export const About = () => {

  const {user} = useAuth();

  return (
    <>
      <main>
        {/* first section  */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Welcome, {user ? ` ${user.username} to our website` : `to our website`} </p>
              <h1>Why Choose Us?</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorum temporibus voluptatem ipsa culpa ad, veritatis nisi, quo
                accusantium nulla quas non earum eos sunt iste aliquid magni
                cupiditate dolore commodi quis.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorum temporibus voluptatem ipsa culpa ad, veritatis nisi, quo
                accusantium nulla quas non earum eos sunt iste aliquid magni
                cupiditate dolore commodi quis.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorum temporibus voluptatem ipsa culpa ad, veritatis nisi, quo
                accusantium nulla quas non earum eos sunt iste aliquid magni
                cupiditate dolore commodi quis.
              </p>
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
              <img src="/images/about.png" alt="hero" width={500} height={500} />
            </div>
          </div>
        </section>
      </main>
    </>
  )
};
