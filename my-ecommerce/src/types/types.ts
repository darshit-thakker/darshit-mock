export interface NavbarProps {
  onToggleFilter?: () => void;
  showFilterToggle?: boolean;
  onSearch?: (query: string) => void;
}

export interface FilterProps {
  onApplyFilters: (filters: { colors: string[], priceRange: number, categories: string[], collections: string[] }) => void;
  onResetFilters: () => void;
  isVisible: boolean;
}

export interface Product {
    id: number;
    title: string;
    category: string;
    price: string;
    rating: number;
    img_url: string;
    collection: string;
    color: string;
    desc: string;
    color1: string;
    color2: string;
  }

export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    img_url: string;
  }

export interface OrderedItem {
  id: number;
  title: string;
  quantity: number;
}

export interface StarRatingProps {
    rating: number;
  }

export interface FavouriteItem {
    id: number;
    title: string;
    price: string;
  }

export interface Product {
    id: number;
    title: string;
    category: string;
    price: string;
    rating: number;
    img_url: string;
    collection: string;
    color: string;
    desc: string;
    color1: string;
    color2: string;
  }
  
export interface ProductListProps {
    filters: {
      colors: string[];
      priceRange: number;
      categories: string[];
      collections: string[];
    };
    searchQuery: string;
  }