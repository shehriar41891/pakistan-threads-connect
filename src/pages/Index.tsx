import { useState } from 'react';
import AuthLanding from './AuthLanding';
import DonationPlatform from './DonationPlatform';
import AdminDashboard from './AdminDashboard';

interface User {
  email: string;
  role: 'donor' | 'admin';
  name: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleAuthenticate = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthLanding onAuthenticate={handleAuthenticate} />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard onLogout={handleLogout} user={user} />;
  }

  return <DonationPlatform onLogout={handleLogout} user={user} />;
};

export default Index;
