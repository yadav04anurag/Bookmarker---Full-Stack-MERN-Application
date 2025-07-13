import { Star, Trash2, Edit } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-card p-4 rounded-lg shadow-md border border-border">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-card-foreground">{note.title}</h3>
        {note.isFavorite && <Star className="text-yellow-500" />}
      </div>
      <p className="mt-2 text-card-foreground/80">{note.content}</p>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          {note.tags.map(tag => (
            <span key={tag} className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm">{tag}</span>
          ))}
        </div>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(note)} className="text-blue-500 hover:text-blue-700">
            <Edit size={20} />
          </button>
          <button onClick={() => onDelete(note._id)} className="text-red-500 hover:text-red-700">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;