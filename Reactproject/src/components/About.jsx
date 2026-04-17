

import React from "react";
import '../App.css';


const About = () => {
  return (
    <>
      <div className="container3 about-page " >
        <div className="row g-5">
         
          <div className="col-lg-5 col-md-6 col-sm-12 text-center mb-4 mb-md-0">
            <img
              src="https://media.timeout.com/images/100515315/image.jpg"
              className="imgAbout"
              alt="About"
            />
          </div>

        <div className="col-lg-7 col-md-6 col-sm-12">
            <h2 className="mb-3 text-center">About Us</h2>
            <p className="para">
              Welcome to <b>ShopSmart</b>, your trusted online shopping destination.
              We started our journey in 2020 with a simple idea – to make quality
              products affordable and accessible to everyone.
          
           
              Our team believes that shopping should be <b>easy, fun, and reliable</b>.
              That’s why we handpick every product with care and ensure it meets our
              strict quality standards.
            
              From fashion to lifestyle essentials, we bring you a wide collection of
              products that fit your style and budget. We work directly with
              manufacturers and suppliers to cut unnecessary costs, so you always get
              the <b>best price without compromising quality</b>.
            </p>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default About;
