import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { register } from '../../services/authService';

interface RegisterFormProps {
  onSuccess: (data: any) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const mutation = useMutation(register);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    mutation.mutate(
      { email, password, role },
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
      <div>
        <label className="block text-sm font-bold mb-2">Confirmer le mot de passe</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-cyan-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Je suis un(e)</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-cyan-500"
        >
          <option value="user">Utilisateur</option>
          <option value="artist">Artiste</option>
          <option value="certifier">Certifieur</option>
        </select>
      </div>
      {mutation.isError && (
        <p className="text-red-600 text-sm">{(mutation.error as any)?.message || 'Erreur lors de l\'inscription'}</p>
      )}
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="w-full bg-cyan-500 text-white py-2 rounded font-bold hover:bg-cyan-600 disabled:bg-gray-400"
      >
        {mutation.isLoading ? 'Inscription...' : "S'inscrire"}
      </button>
    </form>
  );
};

export default RegisterForm;