import HeroImg from "@/assets/Frame_1707481586.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden" aria-label="Hero section">
      {/* 🎨 Background decoration */}
      <div
        className="
          absolute inset-0 -z-10
          bg-linear-to-b from-blue-50/60 to-transparent
          dark:from-gray-900
        "
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-16">
          {/* LEFT CONTENT */}
          <div className="w-full md:w-1/2 space-y-8">
            {/* 🏷 Badge */}
            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                bg-blue-100 px-4 py-2
                text-sm font-medium text-blue-700
                dark:bg-blue-900/30 dark:text-blue-300
              "
            >
              ⭐ Jump start your shopping
            </span>

            {/* 🧠 Main Heading */}
            <h1
              className="
                text-4xl md:text-5xl lg:text-6xl
                font-bold leading-tight
                text-gray-900 dark:text-white
              "
            >
              We boost the growth for{" "}
              <span className="relative text-blue-600 dark:text-blue-400">
                startups
                <span
                  className="
                    absolute left-0 -bottom-2
                    h-1 w-full
                    bg-blue-200/70 dark:bg-blue-500/30
                  "
                />
              </span>{" "}
              to Fortune 500
            </h1>

            {/* 📝 Description */}
            <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300">
              Discover high-quality products, smart deals, and seamless shopping
              experiences designed to help your business grow faster.
            </p>

            {/* 🎯 CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                aria-label="Start shopping"
                className="
                  rounded-xl
                  bg-blue-600 px-8 py-4
                  text-white font-semibold
                  transition
                  hover:bg-blue-700
                  shadow-lg shadow-blue-500/20
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                "
              >
                Start Shopping
              </button>

              <button
                aria-label="Learn more"
                className="
                  rounded-xl
                  border border-gray-300
                  px-8 py-4
                  font-semibold
                  text-gray-700
                  transition
                  hover:bg-gray-100
                  dark:border-gray-700
                  dark:text-gray-700
                  dark:hover:text-gray-200
                  dark:hover:bg-gray-800
                  focus:outline-none focus:ring-2 focus:ring-gray-400
                "
              >
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              {/* ✨ Glow Effect */}
              <div
                className="
                  absolute -inset-6
                  rounded-3xl
                  bg-blue-400/20
                  blur-3xl -z-10
                "
              />

              <img
                src={HeroImg}
                alt="Shopping illustration"
                loading="lazy"
                decoding="async"
                className="
                  w-full max-w-lg
                  rounded-2xl
                  shadow-xl
                  transition-transform duration-300
                  hover:scale-[1.02]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
