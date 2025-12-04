'use client';

import { useState } from 'react';
import { contactApi } from '@/lib/api/contact';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await contactApi.submitMessage(formData);

      if (response.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(response.error || 'Gagal mengirim pesan');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nama
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border-b-2 border-border-light focus:border-primary outline-none transition-colors bg-transparent"
          placeholder="Nama Anda"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border-b-2 border-border-light focus:border-primary outline-none transition-colors bg-transparent"
          placeholder="email@example.com"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Pesan
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border-b-2 border-border-light focus:border-primary outline-none transition-colors bg-transparent resize-none"
          placeholder="Tulis pesan Anda di sini..."
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  );
}
