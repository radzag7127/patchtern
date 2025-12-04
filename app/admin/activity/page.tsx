import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ActivityLogPage() {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/admin/login');
  }

  // Fetch activity logs
  const { data: logs } = await supabase
    .from('admin_activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      case 'login':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'create':
        return 'Dibuat';
      case 'update':
        return 'Diperbarui';
      case 'delete':
        return 'Dihapus';
      case 'login':
        return 'Masuk';
      case 'logout':
        return 'Keluar';
      default:
        return action;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Log Aktivitas</h1>
              <p className="text-xs sm:text-sm text-gray-600">{user.email}</p>
            </div>
            <a
              href="/admin"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
            >
              ← Kembali ke Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {logs && logs.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal & Waktu
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pengguna
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target
                    </th>
                    <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {formatDate(log.created_at)}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">
                        {log.user_email || 'Sistem'}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${getActionColor(
                            log.action
                          )}`}
                        >
                          {getActionLabel(log.action)}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-900">
                        {log.table_name && (
                          <span className="font-medium capitalize">{log.table_name}</span>
                        )}
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4 text-sm text-gray-600">
                        {log.record_name && (
                          <span className="font-medium">{log.record_name}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">Belum ada log aktivitas</p>
          </div>
        )}
      </main>
    </div>
  );
}
