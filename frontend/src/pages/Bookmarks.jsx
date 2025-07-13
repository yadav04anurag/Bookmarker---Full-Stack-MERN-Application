import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import BookmarkCard from '../components/BookmarkCard';
import BookmarkForm from '../components/BookmarkForm';
import Button from '../components/Button';
import Input from '../components/Input';
import { useDebounce } from '../hooks/useDebounce'; // Import the hook
import { Search } from 'lucide-react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const [isLoading, setIsLoading] = useState(true);

  // Debounce the search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchBookmarks = useCallback(async () => {
    setIsLoading(true);
    try {
      // Pass the debounced search term as a query parameter
      const { data } = await api.get('/bookmarks', {
        params: { q: debouncedSearchTerm },
      });
      setBookmarks(data);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
      setBookmarks([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      await api.delete(`/bookmarks/${id}`);
      fetchBookmarks();
    }
  };

  const handleEdit = (bookmark) => {
    setEditingBookmark(bookmark);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setEditingBookmark(null);
    setIsFormOpen(false);
    fetchBookmarks();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">My Bookmarks</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="flex-shrink-0 max-w-50">Add Bookmark</Button>
        </div>
      </div>

      {isFormOpen && (
        <BookmarkForm
          bookmark={editingBookmark}
          onClose={handleFormClose}
        />
      )}

      {isLoading ? (
        <p className="text-center text-foreground/80 mt-10">Loading bookmarks...</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          {bookmarks.length === 0 && !isFormOpen && (
            <p className="text-center text-foreground/80 mt-10">
              {debouncedSearchTerm ? `No bookmarks found for "${debouncedSearchTerm}".` : "You have no bookmarks yet. Add one!"}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Bookmarks;