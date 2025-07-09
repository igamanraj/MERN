import { useAuth } from "../../store/Auth";
import "./Services.css";

export const Services = () => {
  const { services,} = useAuth();

  return (
    <>
      <section className="services-section">
        <div className="container">
          <h1 className="services-title">Services</h1>
        </div>
        <div className="services-grid">
          {services.map((curElem, index) => {

            const {price, description, provider, service} = curElem;
            return(

            <div className="service-card" key={index}>
              <div className="card-img">
                <img
                  src="https://www.nexel.in/media/blog_images/web_development_Z62jy4k.jpg"
                  alt="our services info"
                  width={250}
                />
              </div>

              <div className="service-info">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h1>{service}</h1>
                <p>{description}</p>
              </div>
            </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
