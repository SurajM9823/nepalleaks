import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, Save, X } from 'lucide-react';
import { Article } from '../types';

interface AdminPanelProps {
  articles: Article[];
  onSave: (article: Article) => void;
  onDelete: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ articles, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedArticle, setEditedArticle] = useState<Partial<Article>>({});
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (article: Article) => {
    setIsEditing(article.id);
    setEditedArticle(article);
  };

  const handleSave = () => {
    if (editedArticle.title && editedArticle.content) {
      onSave(editedArticle as Article);
      setIsEditing(null);
      setEditedArticle({});
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditedArticle({
      id: Date.now().toString(),
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      date: new Date().toISOString(),
      imageUrl: '',
      category: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Article Management</h1>
            <button
              onClick={handleCreate}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlusCircle size={20} className="mr-2" />
              New Article
            </button>
          </div>

          <div className="space-y-6">
            {(isCreating || isEditing) && (
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editedArticle.title || ''}
                      onChange={(e) => setEditedArticle({ ...editedArticle, title: e.target.value })}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editedArticle.category || ''}
                      onChange={(e) => setEditedArticle({ ...editedArticle, category: e.target.value })}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={editedArticle.excerpt || ''}
                      onChange={(e) => setEditedArticle({ ...editedArticle, excerpt: e.target.value })}
                      rows={3}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Content
                    </label>
                    <textarea
                      value={editedArticle.content || ''}
                      onChange={(e) => setEditedArticle({ ...editedArticle, content: e.target.value })}
                      rows={6}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => {
                      setIsEditing(null);
                      setIsCreating(false);
                      setEditedArticle({});
                    }}
                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X size={20} className="mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save size={20} className="mr-2" />
                    Save
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {article.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {article.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {article.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {article.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(article)}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => onDelete(article.id)}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;