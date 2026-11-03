import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}

export default function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <div className="filtre">
      <p>
        <label htmlFor="arama">Etkinlik ara</label>
        <input
          id="arama"
          type="search"
          placeholder="Örn. atölye, kariyer"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="kategori">Kategori</label>
        <select
          id="kategori"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </p>
    </div>
  );
}
