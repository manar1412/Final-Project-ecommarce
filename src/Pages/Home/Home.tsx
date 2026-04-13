// import "aos/dist/aos.css";
import Hero from "../../Components/Hero/Hero";
import ProductCard from "../../Components/ProductCard/ProductCard";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import Loading from "../../Components/Loading/Loading";
import useProducts from "../../Hooks/useProducts";
import useAOS from "../../Hooks/useAOS";
import { Loader2 } from "lucide-react";

const PRODUCTS_PER_PAGE = 20;

export default function Home() {
  useAOS();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts();

  if (isLoading) return <Loading />;

  const totalProductsShown =
    data?.pages.reduce((total, page) => total + page.data.length, 0) ?? 0;

  return (
    <>
      <div data-aos="fade-down">
        <Hero />
      </div>

      {/* Category Slider */}
      <div className="max-w-6xl mx-auto">
        <h2 data-aos="fade-left" className="text-2xl font-semibold mb-8">
          Shop Popular Categories
        </h2>
        <div data-aos="zoom-in" className="mb-8 ">
          <CategorySlider />
        </div>

        {/* Product Cards */}
        <h2 data-aos="fade-left" className="text-2xl font-semibold mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {data?.pages.map((page) =>
            page.data.map((product) => (
              <div key={product._id} data-aos="fade-up">
                <ProductCard
                  key={product._id}
                  id={product._id}
                  image={product.imageCover}
                  category={product.category.name}
                  name={product.title}
                  price={product.price}
                  priceAfterDiscount={product.priceAfterDiscount}
                  ratingsAverage={product.ratingsAverage}
                />
              </div>
            ))
          )}
        </div>

        {/* Load more button */}
        {hasNextPage && totalProductsShown >= PRODUCTS_PER_PAGE && (
          <div className="flex justify-center mb-16 ">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
            >
              {isFetchingNextPage ? (
                <Loader2 className="animate-spin w-6 h-6" />
              ) : (
                "Load More Products"
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
