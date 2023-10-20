import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ToastContainer, toast } from "react-toastify";
import "./home-style.css";

const Home = () => {
  return (
    <div>
      <Carousel
        autoPlay
        interval={2500}
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop={true}
        className="custom-carousel"
      >
        <div>
          <img className="slika" src="download.jpeg" alt="slika1" />
        </div>
        <div>
          <img className="slika" src="" alt="slika2" />
        </div>
        <div>
          <img className="slika" src="" alt="slika3" />
        </div>
      </Carousel>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    </div>
  );
};

export default Home;
