export interface Product {
  id: string;
  name: string;
  description: string;
  material: string;
  size?: string;
  image_url: string;
  category: string; // Now dynamic from categories table
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  display_name: string;
  is_protected: boolean;
  is_default: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
}

export interface GalleryImage {
  id: string;
  section: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
}

export type InsertProduct = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
export type InsertContactMessage = Omit<ContactMessage, 'id' | 'status' | 'created_at'>;
export type InsertCategory = Omit<Category, 'id' | 'created_at' | 'updated_at'>;
