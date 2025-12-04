import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CategoryManager } from '@/components/admin/CategoryManager';
import type { Category } from '@/types/models';

export default async function CategoriesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch categories:', error);
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
          <p className="mt-2 text-gray-600">
            Manage product categories. Protected categories cannot be deleted.
          </p>
        </div>

        <CategoryManager initialCategories={categories as Category[]} />
      </div>
    </div>
  );
}
