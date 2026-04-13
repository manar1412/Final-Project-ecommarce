export default function CategorySkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading category"
      className="
        bg-gray-100 dark:bg-gray-700 
        rounded-xl p-4 
        flex flex-col items-center justify-center 
        animate-pulse gap-6
        w-full
        min-h-35
      "
    >
      {/* Circle Skeleton (Category Image/Icon) */}
      <div
        className="
          w-16 h-16 
          sm:w-20 sm:h-20 
          bg-gray-300 dark:bg-gray-600 
          rounded-full
        "
      />

      {/* Text Skeleton (Category Name) */}
      <div
        className="
          h-4 
          w-20 sm:w-24 
          bg-gray-300 dark:bg-gray-600 
          rounded
        "
      />
    </div>
  );
}
