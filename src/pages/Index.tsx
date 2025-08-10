import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DonationPlatform from './DonationPlatform';
import AdminDashboard from './AdminDashboard';
import { Shield, Heart } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'selector' | 'donation' | 'admin'>('selector');

  if (currentView === 'donation') {
    return <DonationPlatform />;
  }

  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-4">Akhuwat USA</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Used Clothes Donation Platform - Connecting generosity across America to families in Pakistan
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="p-6 shadow-elegant cursor-pointer transition-smooth hover:shadow-glow" 
                  onClick={() => setCurrentView('donation')}>
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Make a Donation</CardTitle>
                <CardDescription>
                  Donate your used clothes and help families in Pakistan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="hero" className="w-full">
                  Start Donating
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-elegant cursor-pointer transition-smooth hover:shadow-glow" 
                  onClick={() => setCurrentView('admin')}>
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Admin Dashboard</CardTitle>
                <CardDescription>
                  Manage donations, logistics, and donor relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Access Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <p>© 2025 Akhuwat USA. All rights reserved. | Tax ID: 123-45-6789</p>
            <p className="mt-2">A trusted 501(c)(3) nonprofit organization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
