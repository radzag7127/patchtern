'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Category } from '@/types/models';
import { createClient } from '@/lib/supabase/client';

interface CategoryManagerProps {
  initialCategories: Category[];
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDisplayName, setNewCategoryDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const name = newCategoryName.trim().toLowerCase();
      const displayName = newCategoryDisplayName.trim();

      if (!name || !displayName) {
        setError('Both fields are required');
        setLoading(false);
        return;
      }

      // Calculate next display order
      const maxOrder = Math.max(...categories.map(c => c.display_order), 0);

      const { data, error: insertError } = await supabase
        .from('categories')
        .insert({
          name,
          display_name: displayName,
          display_order: maxOrder + 1,
          is_protected: false,
          is_default: false,
        })
        .select()
        .single();

      if (insertError) {
        if (insertError.code === '23505') {
          setError('Category already exists');
        } else {
          setError(insertError.message);
        }
        setLoading(false);
        return;
      }

      setSuccess(`Category "${displayName}" added successfully`);
      setNewCategoryName('');
      setNewCategoryDisplayName('');
      setIsAdding(false);
      router.refresh();
    } catch (err) {
      setError('Failed to add category');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    if (category.is_protected) {
      setError('Cannot delete protected category');
      return;
    }

    if (categories.length <= 1) {
      setError('Cannot delete the last category');
      return;
    }

    if (!confirm(`Are you sure you want to delete "${category.display_name}"?`)) {
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Check if any products use this category
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('category', category.name);

      if (count && count > 0) {
        setError(`Cannot delete "${category.display_name}" - ${count} product(s) are using this category`);
        setLoading(false);
        return;
      }

      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', category.id);

      if (deleteError) {
        setError(deleteError.message);
        setLoading(false);
        return;
      }

      setSuccess(`Category "${category.display_name}" deleted successfully`);
      router.refresh();
    } catch (err) {
      setError('Failed to delete category');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Category Management</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Category
          </button>
        )}
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">{success}</p>
        </div>
      )}

      {/* Add Category Form */}
      {isAdding && (
        <form onSubmit={handleAddCategory} className="p-6 bg-white border border-gray-200 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Add New Category</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name (lowercase, no spaces)
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value.toLowerCase().replace(/\s/g, ''))}
              placeholder="e.g., topi"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={newCategoryDisplayName}
              onChange={(e) => setNewCategoryDisplayName(e.target.value)}
              placeholder="e.g., Topi"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Category'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setNewCategoryName('');
                setNewCategoryDisplayName('');
                setError(null);
              }}
              disabled={loading}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Categories List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Display Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.display_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    {category.is_protected && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Protected
                      </span>
                    )}
                    {category.is_default && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Default
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category.display_order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    disabled={category.is_protected || loading}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      category.is_protected
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                    title={category.is_protected ? 'Cannot delete protected category' : 'Delete category'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Protection Rules:</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Protected categories (like "kemeja") cannot be deleted</li>
          <li>Cannot delete a category if products are using it</li>
          <li>Cannot delete the last remaining category</li>
          <li>Category names must be unique and lowercase</li>
        </ul>
      </div>
    </div>
  );
}
