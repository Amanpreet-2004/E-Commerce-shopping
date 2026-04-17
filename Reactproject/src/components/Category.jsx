import React,{useEffect} from "react";
import AOS from "aos";
const Category = () => {
     useEffect(()=> {
    AOS.init()
  },[])
    return(
        <>
        <h1>All type of Categories</h1>
        <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4" style={{overflow:"hidden"}}>
                <div data-aos="flip-left" className="col-lg-3">
                  <img src="https://boutiquestoredesign.com/wp-content/uploads/2018/09/mens-apparel-fashion-stores-interior-design-1-1334x834.jpg" alt="mens clothes" className="img-fluid"/>
                 <h4>Men's collection</h4>
                </div>
                <div data-aos="flip-up" className="col-lg-3">
                    <img src="https://img.kwcdn.com/product/1dab9a690e/63f7126c-f6a3-47ba-9755-705a8865abd3_1340x1786.jpeg.a.jpeg" alt="mens clothes" className="img-fluid"/>
                    <h4>Women's collection</h4>
                </div>
                <div data-aos="flip-down" className="col-lg-3">
                  <img src="https://i.pinimg.com/736x/63/81/38/638138dbb98bf5a38620654ea6a45ef9.jpg" alt="mens clothes" className="img-fluid"/>
                <h4>Kids's collection</h4>
                </div>
                 <div data-aos="flip-right" className="col-lg-3">
                    <img src="https://m.media-amazon.com/images/I/7178AGk9vAL._SL1500_.jpg" alt="mens clothes" className="img-fluid"/>
                <h4>Gift Items</h4>
                </div>
            </div>
        </div>
                
            <div className="container1">
  <div className="row row-cols-1 row-cols-sm-3 row-cols-md- row-cols-lg-5 g-5 text-center" style={{overflow:"hidden"}}>
    <div data-aos="zoom-in" className="col">
      <img
        src="https://cdn-icons-png.flaticon.com/128/3901/3901488.png"
        alt="Free Shipping"
        className="img-icon"
      />
      <h5>Free Shipping</h5>
      <p>Get your orders delivered with no extra cost</p>
    </div>

    <div data-aos="zoom-in-up" className="col">
      <img
        src="https://cdn-icons-png.flaticon.com/128/10439/10439810.png"
        alt="Support 24/7"
        className="img-icon"
      />
      <h5>Support 24/7</h5>
      <p>We are here to assist you anytime..</p>
    </div>

    <div data-aos="zoom-in-down" className="col">
      <img
        src="https://cdn-icons-png.flaticon.com/128/8859/8859498.png"
        alt="Money Back"
        className="img-icon"
      />
      <h5>100% Money Back</h5>
      <p>Full refund if you are not satisfied</p>
    </div>

    <div data-aos="zoom-in-left" className="col">
      <img
        src="https://cdn-icons-png.flaticon.com/128/10464/10464776.png"
        alt="Secure Payment"
        className="img-icon"
      />
      <h5>Payment Secure</h5>
      <p>Your payment information is safe with us..</p>
    </div>

    <div data-aos="zoom-out" className="col">
      <img
        src="https://cdn-icons-png.flaticon.com/128/791/791979.png"
        alt="Discount"
        className="img-icon"
      />
      <h5>Discount</h5>
      <p>Enjoy the best prices on our products</p>
    </div>
  </div>
 <hr />
</div>




        </>
    )
}

export default Category;