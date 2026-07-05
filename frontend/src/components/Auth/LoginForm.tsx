import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { login } from '../../services/authService';

interface LoginFormProps {
  onSuccess: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useMutation(login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { email, password },
      {
        onSuccess,
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-cyan-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-cyan-500"
          required
        />
      </div>
      {mutation.isError && (
        <p className="text-red-600 text-sm">{(mutation.error as any)?.message || 'Erreur lors de la connexion'}</p>
      )}
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="w-full bg-cyan-500 text-white py-2 rounded font-bold hover:bg-cyan-600 disabled:bg-gray-400"
      >
        {mutation.isLoading ? 'Connexion...' : 'Se Connecter'}
      </button>
    </form>
  );
};

export default LoginForm;