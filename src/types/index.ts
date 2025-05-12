export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage?: string;
  date: string;
  imageUrl: string;
  category: string;
  tags?: string[];
  readTime?: number;
  featured?: boolean;
  trending?: boolean;
  views?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bookmarks: string[];
  preferences?: {
    darkMode: boolean;
    categories: string[];
  };
}

export type ThemeMode = 'light' | 'dark';