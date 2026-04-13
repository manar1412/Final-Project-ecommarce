import useCategories from "../../../Hooks/useCategories";
import useSubcategories from "../../../Hooks/useSubcategories";

interface SidebarProps {
  selectedCategoryId?: string;
  setSelectedCategoryId: (id?: string) => void;
  selectedSubcategoryId?: string;
  setSelectedSubcategoryId: (id?: string) => void;
}

export default function Sidebar({
  selectedCategoryId,
  setSelectedCategoryId,
  selectedSubcategoryId,
  setSelectedSubcategoryId,
}: SidebarProps) {
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories();

  const { data: subcategoriesData, isLoading: isSubcategoriesLoading } =
    useSubcategories(selectedCategoryId || "");

  const baseBtn =
    "px-4 py-2 rounded-lg border text-sm text-left transition-all duration-200 cursor-pointer";

  const activeBtn = "bg-blue-600 text-white border-blue-600";
  const inactiveBtn =
    "bg-gray-50 text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-400";

  return (
    <aside className="bg-white rounded-xl shadow-md p-5 space-y-8 sticky top-24">
      {/* Category */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800 ">
          Categories
        </h2>

        {isCategoriesLoading ? (
          <p className="text-sm text-gray-500">Loading categories...</p>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSelectedCategoryId(undefined)}
              className={`${baseBtn}  ${
                !selectedCategoryId ? activeBtn : inactiveBtn
              }`}
            >
              All Categories
            </button>

            {categoriesData?.data.map((category) => (
              <button
                key={category._id}
                onClick={() => {
                  setSelectedCategoryId(category._id);
                  setSelectedSubcategoryId(undefined);
                }}
                className={`${baseBtn} ${
                  selectedCategoryId === category._id ? activeBtn : inactiveBtn
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Subcategory */}
      {selectedCategoryId && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Subcategory
          </h2>

          {isSubcategoriesLoading ? (
            <p className="text-sm text-gray-500">Loading subcategories...</p>
          ) : (
            <select
              value={selectedSubcategoryId || ""}
              onChange={(e) =>
                setSelectedSubcategoryId(e.target.value || undefined)
              }
              className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Subcategories</option>

              {subcategoriesData?.data.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </aside>
  );
}
