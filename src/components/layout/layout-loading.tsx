const LayoutLoading = () => {
  return (
    <div className="min-h-screen">
      {/* Main content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutLoading;
