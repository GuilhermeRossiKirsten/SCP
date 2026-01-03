"use client";

import { useState, useEffect } from "react";
import { Search, X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";

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

  const clearAllFilters = () => {
    setSearchInput("");
    onTagsSelect([]);
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
      {/* Compact Search Bar with Filter Button */}
      <div className="flex gap-3">
        <div className="relative group flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-green-400 transition-colors" />
          <Input
            type="text"
            placeholder="Buscar artigos..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 pr-10 h-11 bg-zinc-900/50 border-zinc-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all text-white placeholder:text-gray-500 rounded-lg"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors p-1 hover:bg-green-500/10 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdown Button */}
        {availableTags.length > 0 && (
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 h-11 rounded-lg text-sm font-semibold transition-all ${
              selectedTags.length > 0 || isFilterOpen
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                : "bg-zinc-900/50 border border-zinc-800 text-gray-300 hover:border-green-500/50 hover:text-green-400"
            }`}
          >
            <Filter className="w-4 h-4" />
            {selectedTags.length > 0 && (
              <span className="flex items-center justify-center min-w-[1.25rem] h-5 bg-white/20 rounded-full text-xs font-bold">
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
        <div className="space-y-3 bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
              <span>Categorias</span>
              {selectedTags.length > 0 && (
                <span className="text-green-400">
                  ({selectedTags.length} selecionadas)
                </span>
              )}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={() => onTagsSelect([])}
                className="text-xs text-gray-400 hover:text-green-400 transition-colors font-medium"
              >
                Limpar seleção
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
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                      : "bg-zinc-900/50 border border-zinc-800 text-gray-300 hover:border-green-500/50 hover:text-green-400 hover:bg-green-500/5"
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
        <div className="flex items-center justify-between gap-3 text-sm bg-green-500/5 border border-green-500/20 rounded-lg px-4 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-gray-400 font-medium">Filtros ativos:</span>
            <div className="flex flex-wrap gap-2">
              {searchInput && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 rounded-md border border-green-500/30 font-medium">
                  Busca: "{searchInput}"
                </span>
              )}
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 rounded-md border border-green-500/30 font-medium"
                >
                  {tag}
                  <button
                    onClick={() => handleTagToggle(tag)}
                    className="hover:text-green-300 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={clearAllFilters}
            className="text-xs text-gray-400 hover:text-green-400 transition-colors font-medium whitespace-nowrap"
          >
            Limpar tudo
          </button>
        </div>
      )}
    </div>
  );
}
