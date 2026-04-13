import { useState } from "react";
import MainContent from "./MainContent/MainContent";
import Sidebar from "./Sidebar/Sidebar";

export default function Products() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);

  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    string | undefined
  >(undefined);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto py-10">
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
        >
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-1/4">
          <Sidebar
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            selectedSubcategoryId={selectedSubcategoryId}
            setSelectedSubcategoryId={setSelectedSubcategoryId}
          />
        </div>

        {/* Products */}
        <div className="w-full md:w-3/4">
          <MainContent
            selectedCategoryId={selectedCategoryId}
            selectedSubcategoryId={selectedSubcategoryId}
          />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
          <div className="w-80 bg-white h-full p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 text-xl"
              >
                ✕
              </button>
            </div>

            <Sidebar
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={(id) => {
                setSelectedCategoryId(id);
                setIsSidebarOpen(false);
              }}
              selectedSubcategoryId={selectedSubcategoryId}
              setSelectedSubcategoryId={(id) => {
                setSelectedSubcategoryId(id);
                setIsSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
