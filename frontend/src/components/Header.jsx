import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Book, LogIn, LogOut, User, Home, Menu, X, Notebook, Bookmark } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  const activeLinkStyle = {
    color: 'var(--primary)',
    fontWeight: '600',
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 text-primary"
            >
              <Book className="h-8 w-8" />
              <span className="text-2xl font-bold">Bookmarker</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center space-x-1 hover:text-primary transition-colors">
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            {user && (
              <>
                <NavLink to="/notes" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <Notebook size={18} />
                  <span>Notes</span>
                </NavLink>
                <NavLink to="/bookmarks" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <Bookmark size={18} />
                  <span>Bookmarks</span>
                </NavLink>
              </>
            )}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                <NavLink to="/profile" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <User size={18} />
                  <span>Profile</span>
                </NavLink>
                <button onClick={logout} className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink to="/login" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center space-x-1 hover:text-primary transition-colors">
                <LogIn size={18} />
                <span>Login</span>
              </NavLink>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-foreground/10 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center space-x-2 hover:bg-foreground/10 text-foreground px-3 py-2 rounded-md text-base font-medium">
              <Home size={20} />
              <span>Home</span>
            </NavLink>
            {user && (
              <>
                <NavLink to="/notes" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center space-x-2 hover:bg-foreground/10 text-foreground  px-3 py-2 rounded-md text-base font-medium">
                  <Notebook size={20} />
                  <span>Notes</span>
                </NavLink>
                <NavLink to="/bookmarks" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center space-x-2 hover:bg-foreground/10 text-foreground px-3 py-2 rounded-md text-base font-medium">
                  <Bookmark size={20} />
                  <span>Bookmarks</span>
                </NavLink>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="px-2 space-y-1">
              {user ? (
                <>
                  <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center space-x-2 hover:bg-foreground/10 text-foreground  px-3 py-2 rounded-md text-base font-medium">
                    <User size={20} />
                    <span>Profile</span>
                  </NavLink>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-left flex items-center space-x-2 hover:bg-foreground/10 text-foreground  px-3 py-2 rounded-md text-base font-medium">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center space-x-2 hover:bg-foreground/10 text-foreground  px-3 py-2 rounded-md text-base font-medium">
                  <LogIn size={20} />
                  <span>Login</span>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;