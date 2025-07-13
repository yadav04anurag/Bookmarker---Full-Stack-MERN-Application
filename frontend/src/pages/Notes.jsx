import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import Button from '../components/Button';
import Input from '../components/Input';
import { useDebounce } from '../hooks/useDebounce';
import { Search } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/notes', {
        params: { q: debouncedSearchTerm },
      });
      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setEditingNote(null);
    setIsFormOpen(false);
    fetchNotes();
  };

  return (
    <div>
      <div className="flex flex-col items-start gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          My Notes
        </h1>
        <div className="flex w-full items-center gap-x-2 md:w-auto">
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 !py-2.5 "
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50" />
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="flex max-w-30">
            Add Note
          </Button>
        </div>
      </div>

      {isFormOpen && (
        <NoteForm
          note={editingNote}
          onClose={handleFormClose}
        />
      )}

      {isLoading ? (
        <p className="text-center text-foreground/80 mt-10">Loading notes...</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          {notes.length === 0 && !isFormOpen && (
            <p className="text-center text-foreground/80 mt-10">
              {debouncedSearchTerm ? `No notes found for "${debouncedSearchTerm}".` : "You have no notes yet. Add one!"}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Notes;