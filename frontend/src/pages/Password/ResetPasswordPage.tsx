import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const token = searchParams.get('token'); // URL'den token parametresini al

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Backend'e POST isteği gönder
    try {
      const response = await fetch('http://localhost:8080/api/auths/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        navigate('/login'); // İşlem başarılıysa login sayfasına yönlendir
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error('Failed to reset password', error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
