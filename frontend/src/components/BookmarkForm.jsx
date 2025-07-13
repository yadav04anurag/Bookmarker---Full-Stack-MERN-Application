import { useState, useEffect } from 'react';
import api from '../services/api';
import Input from './Input';
import Button from './Button';

const BookmarkForm = ({ bookmark, onClose }) => {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    tags: '',
    isFavorite: false,
  });

  useEffect(() => {
    if (bookmark) {
      setFormData({
        url: bookmark.url,
        title: bookmark.title,
        description: bookmark.description || '',
        tags: bookmark.tags.join(', '),
        isFavorite: bookmark.isFavorite,
      });
    }
  }, [bookmark]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    if (bookmark) {
      await api.put(`/bookmarks/${bookmark._id}`, dataToSubmit);
    } else {
      await api.post('/bookmarks', dataToSubmit);
    }
    onClose();
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border mb-6">
      <h2 className="text-2xl font-bold mb-4">{bookmark ? 'Edit Bookmark' : 'Add Bookmark'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="url" placeholder="URL" value={formData.url} onChange={handleChange} required />
        <Input name="title" placeholder="Title (optional)" value={formData.title} onChange={handleChange} />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          rows="3"
        ></textarea>
        <Input name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} />
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isFavorite"
            checked={formData.isFavorite}
            onChange={handleChange}
            className="h-4 w-4 text-primary border-input rounded focus:ring-primary"
          />
          <label htmlFor="isFavorite" className="ml-2 block text-sm text-foreground">
            Favorite
          </label>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600">Cancel</Button>
          <Button type="submit">{bookmark ? 'Update' : 'Create'}</Button>
        </div>
      </form>
    </div>
  );
};

export default BookmarkForm;