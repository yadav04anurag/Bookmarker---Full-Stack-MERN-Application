import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        Welcome to Bookmarker
      </h1>
      <p className="mt-6 text-lg leading-8 text-foreground/80">
        Your personal space to save and organize notes and bookmarks efficiently.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        {user ? (
          <Link to="/profile">
            <Button>Go to Your Profile</Button>
          </Link>
        ) : (
          <>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
            <Link to="/login" className="text-sm font-semibold leading-6 text-foreground">
              Log in <span aria-hidden="true">→</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;