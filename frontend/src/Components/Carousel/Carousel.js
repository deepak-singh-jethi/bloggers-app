import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "./styles.css";

export default function Carousel({ blogs }) {
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  //select only 4 blogs
  const selectedBlogs = sortedBlogs.slice(0, 4);

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper">
      {selectedBlogs &&
        selectedBlogs.map((blog, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[40vh] sm:w-[60vw] mx-auto overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div
                className="p-4 shadow-md rounded bg-fixed flex flex-col justify-end h-full w-full"
                style={{
                  backgroundImage: `url(${blog.imageURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}>
                <div className="text-blue-500 text-shadow-lg opacity-100">
                  <h2 className="font-bold mb-2 ">
                    <span className="text-white text-xl ">{blog.heading}</span>
                  </h2>
                  <p className="text-blue-300">
                    <span className="text-white">
                      {blog.content.substring(0, 100)}...
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
