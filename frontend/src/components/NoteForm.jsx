import { useState, useEffect } from 'react';
import api from '../services/api';
import Input from './Input';
import Button from './Button';

const NoteForm = ({ note, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    isFavorite: false,
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        tags: note.tags.join(', '),
        isFavorite: note.isFavorite,
      });
    }
  }, [note]);

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

    if (note) {
      await api.put(`/notes/${note._id}`, dataToSubmit);
    } else {
      await api.post('/notes', dataToSubmit);
    }
    onClose();
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border mb-6">
      <h2 className="text-2xl font-bold mb-4">{note ? 'Edit Note' : 'Add Note'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          rows="4"
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
          <Button type="submit">{note ? 'Update' : 'Create'}</Button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;