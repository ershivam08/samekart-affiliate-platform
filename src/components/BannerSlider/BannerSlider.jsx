import { useEffect, useState } from "react";
import "./BannerSlider.css";

import banner1 from "../../assets/banners/banner1.jpg";
import banner2 from "../../assets/banners/banner2.jpg";
import banner3 from "../../assets/banners/banner3.jpg";

const banners = [banner1, banner2, banner3];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner-slider">
      <img src={banners[current]} alt="Offer Banner" />
    </div>
  );
};

export default BannerSlider;
