import { Star, Trash2, Edit, ExternalLink } from 'lucide-react';

const BookmarkCard = ({ bookmark, onEdit, onDelete }) => {
  return (
    <div className="bg-card p-4 rounded-lg shadow-md border border-border">
      <div className="flex justify-between items-start">
        <div><a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-md font-semibold text-primary hover:underline">
          {bookmark.title}
        </a>
        </div>
        {bookmark.isFavorite && <Star className="text-yellow-500" />}
      </div>
      <p className="mt-2 text-card-foreground/80">{bookmark.description}</p>
      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary flex items-center space-x-1">
        <span>{bookmark.url}</span>
        <ExternalLink size={14} />
      </a>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          {bookmark.tags.map(tag => (
            <span key={tag} className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm">{tag}</span>
          ))}
        </div>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(bookmark)} className="text-blue-500 hover:text-blue-700">
            <Edit size={20} />
          </button>
          <button onClick={() => onDelete(bookmark._id)} className="text-red-500 hover:text-red-700">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;