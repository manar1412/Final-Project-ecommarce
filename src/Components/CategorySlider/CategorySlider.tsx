import useCategories from "../../Hooks/useCategories";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import CategorySkeleton from "../CategorySkeleton/CategorySkeleton";

export default function CategorySlider() {
  const { data, isLoading, isError } = useCategories();

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load categories
      </div>
    );
  }

  return (
    <section className="mb-8" aria-label="Categories slider">
      <Swiper
        spaceBetween={16}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        modules={[Autoplay]}
      >
        {/* 🔄 Loading State */}
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <SwiperSlide key={i}>
              <CategorySkeleton />
            </SwiperSlide>
          ))}

        {/* ✅ Success State */}
        {!isLoading &&
          data?.data?.map((category) => (
            <SwiperSlide key={category._id}>
              <div
                className="
                  bg-white 
                  border border-gray-200
                  rounded-xl shadow-sm
                  p-3 sm:p-4
                  transition hover:shadow-md
                "
              >
                {/* 🖼 Category Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="
                    w-full
                    h-28 sm:h-32 md:h-36
                    object-cover
                    rounded-md
                  "
                />

                {/* 🏷 Category Name */}
                <h3
                  className="
                    text-center mt-2
                    text-sm sm:text-base
                    font-medium
                    text-gray-800 
                    truncate
                  "
                  title={category.name}
                >
                  {category.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
