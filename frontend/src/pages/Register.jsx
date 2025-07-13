import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-card p-8 rounded-lg shadow-md border border-border">
        <h2 className="text-2xl font-bold text-center text-card-foreground">Create an Account</h2>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit">Sign Up</Button>
        </form>
        <p className="mt-6 text-center text-sm text-card-foreground/80">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;