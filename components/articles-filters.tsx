"use client";

import { useState, useEffect } from "react";
import { Search, X, Filter, ChevronDown, ChevronUp } from "lucide-react";

interface ArticlesFiltersProps {
  onSearchChange: (search: string) => void;
  onTagsSelect: (tags: string[]) => void;
  selectedTags: string[];
  availableTags: string[];
}

export function ArticlesFilters({
  onSearchChange,
  onTagsSelect,
  selectedTags,
  availableTags,
}: ArticlesFiltersProps) {
  const [searchInput, setSearchInput] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsSelect(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsSelect([...selectedTags, tag]);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, onSearchChange]);

  return (
    <div className="space-y-4">
      {/* Search Bar with Filter Button */}
      <div className="flex gap-3">
        <div className="relative group flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lorenzo-light/40 group-focus-within:text-lorenzo-accent transition-colors" />
          <input
            type="text"
            placeholder="Buscar artigos..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-lorenzo-light/5 border-2 border-transparent focus:border-lorenzo-accent focus:outline-none transition-all text-lorenzo-light placeholder:text-lorenzo-light/30 text-sm"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-lorenzo-light/40 hover:text-lorenzo-accent transition-colors p-1 hover:bg-lorenzo-accent/10"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        {availableTags.length > 0 && (
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
              selectedTags.length > 0 || isFilterOpen
                ? "bg-lorenzo-accent text-lorenzo-dark"
                : "bg-lorenzo-light/5 text-lorenzo-light/60 hover:bg-lorenzo-light/10 hover:text-lorenzo-accent"
            }`}
          >
            <Filter className="w-4 h-4" />
            {selectedTags.length > 0 && (
              <span className="flex items-center justify-center min-w-[1.25rem] h-5 bg-lorenzo-dark/20 text-xs font-bold">
                {selectedTags.length}
              </span>
            )}
            {isFilterOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Collapsible Tags Filter */}
      {isFilterOpen && availableTags.length > 0 && (
        <div className="space-y-4 bg-lorenzo-light/5 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lorenzo-light/60">
              <span>Categorias</span>
              {selectedTags.length > 0 && (
                <span className="text-lorenzo-accent">
                  ({selectedTags.length} selecionadas)
                </span>
              )}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={() => onTagsSelect([])}
                className="text-xs text-lorenzo-light/40 hover:text-lorenzo-accent transition-colors font-bold uppercase tracking-wider"
              >
                Limpar
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    isSelected
                      ? "bg-lorenzo-accent text-lorenzo-dark"
                      : "bg-lorenzo-light/5 text-lorenzo-light/60 hover:bg-lorenzo-light/10 hover:text-lorenzo-accent"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Filters Indicator */}
      {(searchInput || selectedTags.length > 0) && (
        <div className="flex items-center justify-between gap-3 text-sm bg-lorenzo-accent/10 px-4 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-lorenzo-light/60 font-bold text-xs uppercase tracking-wider">
              Filtros ativos:
            </span>
            <div className="flex flex-wrap gap-2">
              {searchInput && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-lorenzo-accent/20 text-lorenzo-accent text-xs font-bold uppercase tracking-wider">
                  Busca: "{searchInput}"
                  <button
                    onClick={() => setSearchInput("")}
                    className="hover:text-lorenzo-light transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-lorenzo-accent/20 text-lorenzo-accent text-xs font-bold uppercase tracking-wider"
                >
                  {tag}
                  <button
                    onClick={() => handleTagToggle(tag)}
                    className="hover:text-lorenzo-light transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              setSearchInput("");
              onTagsSelect([]);
            }}
            className="text-xs text-lorenzo-accent hover:text-lorenzo-light transition-colors font-bold uppercase tracking-wider whitespace-nowrap"
          >
            Limpar Tudo
          </button>
        </div>
      )}
    </div>
  );
}
