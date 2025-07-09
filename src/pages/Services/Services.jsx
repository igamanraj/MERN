import { useAuth } from "../../store/Auth";

export const Services = () => {
  const { services,} = useAuth();

  return (
    <>
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
        </div>
        <div className="grid grid-three-cols">
          {services.map((curElem, index) => {

            const {price, description, provider, service} = curElem;
            return(

            <div className="card" key={index}>
              <div className="card-img">
                <img
                  src="https://www.nexel.in/media/blog_images/web_development_Z62jy4k.jpg"
                  alt="our services info"
                  width={250}
                />
              </div>

              <div className="card-deatils">
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
