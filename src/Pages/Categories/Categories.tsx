import { Link } from "react-router-dom";
import useCategories from "../../Hooks/useCategories";
import Loading from "../../Components/Loading/Loading";
import "aos/dist/aos.css";
import useAOS from "../../Hooks/useAOS";

export default function Categories() {
  useAOS();
  const { data, isLoading, isError } = useCategories();

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading categories</p>;

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data?.data.map((category) => (
          <Link
            data-aos="zoom-in"
            to={`/categories/${category._id}`}
            key={category._id}
            className="group"
          >
            <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={category.image}
                alt={category.name}
                className="h-40 w-full object-cover group-hover:scale-105 transition"
              />
              <h3 className="text-center py-3 font-medium">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
