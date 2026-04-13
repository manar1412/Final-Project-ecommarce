import { Loader2 } from "lucide-react";
import Loading from "../../../Components/Loading/Loading";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import useAOS from "../../../Hooks/useAOS";
import useProducts from "../../../Hooks/useProducts";

interface MainContentProps {
  selectedCategoryId?: string;
  selectedSubcategoryId?: string;
}

export default function MainContent({
  selectedCategoryId,
  selectedSubcategoryId,
}: MainContentProps) {
  useAOS();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useProducts({
      categoryId: selectedCategoryId,
      subcategoryId: selectedSubcategoryId,
    });
  if (isLoading) return <Loading />;

  const allProducts = data?.pages.flatMap((page) => page.data) || [];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
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
        ) : (
          <div className="col-span-full flex justify-center items-center mt-8">
            <p className="text-gray-500 text-lg text-center">
              😔 No products found for this filter.
            </p>
          </div>
        )}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-full block mx-auto hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
        >
          {isFetchingNextPage ? (
            <Loader2 className="animate-spin w-6 h-6" />
          ) : (
            "Load More Products"
          )}
        </button>
      )}
    </>
  );
}
