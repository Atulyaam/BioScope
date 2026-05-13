import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { banners } from "../../utils/constant";

// Swiper core styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BannerSlider = () => {
  return (
    <div className="w-full bg-white py-4">
      <div className="mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          style={{
            "--swiper-navigation-color": "#f84464",
            "--swiper-pagination-color": "#f84464",
          }}
        >
          {banners.map((banner, i) => (
            <SwiperSlide key={i}>
              <img
                src={banner}
                alt={`banner-${i + 1}`}
                className="w-full h-[300px] rounded-xl object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSlider;
