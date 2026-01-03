export function ArticleSkeleton() {
  return (
    <div className="h-full border border-border rounded-lg bg-card p-6 animate-pulse">
      {/* Header com data */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-muted rounded" />
        <div className="w-24 h-4 bg-muted rounded" />
      </div>

      {/* Título */}
      <div className="space-y-2 mb-4">
        <div className="w-3/4 h-6 bg-muted rounded" />
        <div className="w-1/2 h-6 bg-muted rounded" />
      </div>

      {/* Descrição */}
      <div className="space-y-2 mb-6">
        <div className="w-full h-4 bg-muted rounded" />
        <div className="w-full h-4 bg-muted rounded" />
        <div className="w-2/3 h-4 bg-muted rounded" />
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <div className="w-16 h-6 bg-muted rounded-full" />
        <div className="w-20 h-6 bg-muted rounded-full" />
        <div className="w-14 h-6 bg-muted rounded-full" />
      </div>

      {/* Footer com link */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <div className="w-24 h-4 bg-muted rounded" />
        <div className="w-4 h-4 bg-muted rounded" />
      </div>
    </div>
  );
}

export function ArticlesGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <ArticleSkeleton key={i} />
      ))}
    </div>
  );
}
