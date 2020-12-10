import React from "react";
import { Link } from "react-router-dom";
import "./OpeningPage.css";
import video from "../../videos/mainvideo.mp4"

const OpeningPage = () => {
  return (
    <div>
    <div>
    {/* <h1> LIVE WITH PURE LOVE </h1> */}
    </div>
    <section className="hero-section">
      <video autoPlay loop muted poster={video}>
        <source src={video} type='video/mp4' />
      </video>
      <div className="hero-slider owl-carousel">
        <div className="hs-item set-bg" data-setbg="#">
          <div className="hs-text">
            <div className="index-container">
              <div className="index-text">
                <h2>Why not adopt today ? </h2>
                <p className="home-paragraph">
                  There are so many loving adoptable pets right in your community waiting for a family to call their own.
                   <br />Find your new best friend thanks to petAdopt.
                  </p>
                <Link to="/signup" className="site-btn">
                  Signup
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default OpeningPage;


