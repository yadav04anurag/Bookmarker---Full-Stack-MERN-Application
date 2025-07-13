import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-card p-6 rounded-lg shadow-md border border-border">
        <p className="text-lg">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className="text-lg mt-4">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;