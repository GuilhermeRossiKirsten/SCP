export function ArticlesGridSkeleton() {
  return (
    <div className="space-y-4">
      {/* Search bar skeleton */}
      <div className="h-12 bg-lorenzo-light/5 animate-pulse" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-lorenzo-light/5 overflow-hidden group">
            {/* Image skeleton */}
            <div className="h-40 bg-lorenzo-light/10 animate-pulse" />

            {/* Content skeleton */}
            <div className="p-6 space-y-4">
              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-lorenzo-light/10 animate-pulse" />
                <div className="h-5 w-20 bg-lorenzo-light/10 animate-pulse" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <div className="h-5 bg-lorenzo-light/10 animate-pulse" />
                <div className="h-5 w-3/4 bg-lorenzo-light/10 animate-pulse" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-lorenzo-light/10 animate-pulse" />
                <div className="h-4 w-5/6 bg-lorenzo-light/10 animate-pulse" />
                <div className="h-4 w-2/3 bg-lorenzo-light/10 animate-pulse" />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-lorenzo-light/10">
                <div className="h-4 w-24 bg-lorenzo-light/10 animate-pulse" />
                <div className="h-4 w-16 bg-lorenzo-light/10 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArticleContentSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-lorenzo-light/10" />
          <div className="h-6 w-24 bg-lorenzo-light/10" />
        </div>
        <div className="h-10 w-3/4 bg-lorenzo-light/10" />
        <div className="h-10 w-1/2 bg-lorenzo-light/10" />
        <div className="h-5 w-32 bg-lorenzo-light/10" />
      </div>

      {/* Content paragraphs */}
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-lorenzo-light/10" />
            <div className="h-4 w-11/12 bg-lorenzo-light/10" />
            <div className="h-4 w-4/5 bg-lorenzo-light/10" />
          </div>
        ))}
      </div>

      {/* Code block skeleton */}
      <div className="h-48 bg-lorenzo-light/5" />

      {/* More paragraphs */}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-lorenzo-light/10" />
            <div className="h-4 w-5/6 bg-lorenzo-light/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
