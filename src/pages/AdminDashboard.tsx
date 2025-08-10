import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Package,
  Users,
  DollarSign,
  MapPin,
  Calendar,
  Download,
  Mail,
  BarChart3,
  Filter,
  FileText,
  Truck,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Clock
} from 'lucide-react';

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  donationType: string;
  method: 'dropoff' | 'pickup';
  location: string;
  zipCode: string;
  numBoxes: number;
  estimatedValue: number;
  status: 'pending' | 'collected' | 'shipped' | 'delivered';
  contributionAmount: number;
  createdAt: string;
  trackingNumber?: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in production this would come from the database
  const mockDonations: Donation[] = [
    {
      id: 'DON-001',
      donorName: 'Sarah Johnson',
      donorEmail: 'sarah.j@email.com',
      donationType: 'clothes',
      method: 'pickup',
      location: 'New York, NY',
      zipCode: '10001',
      numBoxes: 2,
      estimatedValue: 150,
      status: 'shipped',
      contributionAmount: 70,
      createdAt: '2025-01-08',
      trackingNumber: 'UPS123456789'
    },
    {
      id: 'DON-002',
      donorName: 'Michael Chen',
      donorEmail: 'mchen@email.com',
      donationType: 'clothes',
      method: 'dropoff',
      location: 'Los Angeles, CA',
      zipCode: '90210',
      numBoxes: 1,
      estimatedValue: 75,
      status: 'collected',
      contributionAmount: 25,
      createdAt: '2025-01-07'
    },
    {
      id: 'DON-003',
      donorName: 'Emily Rodriguez',
      donorEmail: 'emily.r@email.com',
      donationType: 'clothes',
      method: 'pickup',
      location: 'Chicago, IL',
      zipCode: '60601',
      numBoxes: 3,
      estimatedValue: 225,
      status: 'pending',
      contributionAmount: 90,
      createdAt: '2025-01-09'
    },
    {
      id: 'DON-004',
      donorName: 'David Wilson',
      donorEmail: 'dwilson@email.com',
      donationType: 'clothes',
      method: 'dropoff',
      location: 'Houston, TX',
      zipCode: '77001',
      numBoxes: 1,
      estimatedValue: 100,
      status: 'delivered',
      contributionAmount: 20,
      createdAt: '2025-01-05'
    }
  ];

  const [donations] = useState<Donation[]>(mockDonations);

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || donation.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || donation.method === filterMethod;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const stats = {
    totalDonations: donations.length,
    totalValue: donations.reduce((sum, d) => sum + d.estimatedValue, 0),
    totalContributions: donations.reduce((sum, d) => sum + d.contributionAmount, 0),
    totalBoxes: donations.reduce((sum, d) => sum + d.numBoxes, 0),
    pendingPickups: donations.filter(d => d.status === 'pending' && d.method === 'pickup').length,
    thisMonth: donations.filter(d => new Date(d.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'warning' as const,
      collected: 'default' as const,
      shipped: 'default' as const,
      delivered: 'success' as const
    };
    
    const icons = {
      pending: Clock,
      collected: Package,
      shipped: Truck,
      delivered: CheckCircle
    };
    
    const Icon = icons[status as keyof typeof icons];
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const exportData = () => {
    // In production, this would generate and download a CSV/Excel file
    toast({
      title: "Export Started",
      description: "Your data export is being prepared and will be downloaded shortly.",
    });
  };

  const sendBulkEmail = () => {
    toast({
      title: "Bulk Email Sent",
      description: "Thank you emails have been sent to all donors.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground">Akhuwat USA Donation Management</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={exportData}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="default" onClick={sendBulkEmail}>
              <Mail className="w-4 h-4 mr-2" />
              Send Thank You Emails
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Donations</p>
                <p className="text-2xl font-bold">{stats.totalDonations}</p>
                <p className="text-xs text-success">+{stats.thisMonth} this month</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Value</p>
                <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
                <p className="text-xs text-success">Tax deductible</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Contributions</p>
                <p className="text-2xl font-bold">${stats.totalContributions.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Operational costs</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Pending Pickups</p>
                <p className="text-2xl font-bold">{stats.pendingPickups}</p>
                <p className="text-xs text-warning">Requires attention</p>
              </div>
              <AlertCircle className="w-8 h-8 text-warning" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="logistics">Logistics</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
          </TabsList>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Donation Management</CardTitle>
                <CardDescription>View and manage all donation submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex-1 min-w-60">
                    <Label htmlFor="search">Search Donations</Label>
                    <Input
                      id="search"
                      placeholder="Search by donor name, email, or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status-filter">Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger id="status-filter" className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="collected">Collected</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="method-filter">Method</Label>
                    <Select value={filterMethod} onValueChange={setFilterMethod}>
                      <SelectTrigger id="method-filter" className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Methods</SelectItem>
                        <SelectItem value="pickup">Pickup</SelectItem>
                        <SelectItem value="dropoff">Drop-off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Donations Table */}
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Donation ID</TableHead>
                        <TableHead>Donor</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Boxes</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDonations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell className="font-medium">{donation.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{donation.donorName}</p>
                              <p className="text-sm text-muted-foreground">{donation.donorEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {donation.method}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                              <span className="text-sm">{donation.zipCode}</span>
                            </div>
                          </TableCell>
                          <TableCell>{donation.numBoxes}</TableCell>
                          <TableCell>${donation.estimatedValue}</TableCell>
                          <TableCell>{getStatusBadge(donation.status)}</TableCell>
                          <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Mail className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logistics Tab */}
          <TabsContent value="logistics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Pickup Schedule</CardTitle>
                  <CardDescription>Manage UPS pickup arrangements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donations.filter(d => d.method === 'pickup' && d.status === 'pending').map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{donation.donorName}</p>
                          <p className="text-sm text-muted-foreground">{donation.location}</p>
                          <p className="text-sm text-muted-foreground">{donation.numBoxes} box(es)</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Schedule
                          </Button>
                          <Button variant="default" size="sm">
                            <Truck className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Collection Centers</CardTitle>
                  <CardDescription>Monitor drop-off locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Downtown Center', collected: 15, capacity: 50 },
                      { name: 'Westside Hub', collected: 32, capacity: 50 },
                      { name: 'Northshore Drop-off', collected: 8, capacity: 30 }
                    ].map((center, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{center.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {center.collected}/{center.capacity} boxes
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-smooth" 
                            style={{ width: `${(center.collected / center.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Revenue Summary</CardTitle>
                  <CardDescription>Contributions and operational funding</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <span>Shipping Contributions</span>
                      <span className="font-semibold">${donations.filter(d => d.method === 'pickup').reduce((sum, d) => sum + (d.numBoxes * 20), 0)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <span>Operational Contributions</span>
                      <span className="font-semibold">${donations.reduce((sum, d) => sum + d.contributionAmount, 0) - donations.filter(d => d.method === 'pickup').reduce((sum, d) => sum + (d.numBoxes * 20), 0)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                      <span className="font-semibold">Total Revenue</span>
                      <span className="font-bold text-lg">${stats.totalContributions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Tax Documentation</CardTitle>
                  <CardDescription>Donation receipts and tax forms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="font-medium">Receipts Generated</p>
                        <p className="text-2xl font-bold">{donations.length}</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="font-medium">Total Deductions</p>
                        <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        • {donations.filter(d => d.estimatedValue > 500).length} donations require Form 8283
                      </p>
                      <p className="text-sm text-muted-foreground">
                        • {donations.filter(d => d.estimatedValue > 5000).length} donations need appraisal
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Donors Tab */}
          <TabsContent value="donors" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Donor Management</CardTitle>
                <CardDescription>View donor profiles and history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Donor profiles would be implemented here */}
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Donor management features will be available soon.</p>
                    <p className="text-sm">Track donor history, send personalized thank you messages, and more.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;