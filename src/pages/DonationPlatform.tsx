import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  MapPin, 
  Package, 
  Truck, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Mail,
  Phone,
  Home,
  Calculator,
  CreditCard,
  Receipt
} from 'lucide-react';
import heroImage from '@/assets/charity-hero.jpg';

interface DonationState {
  step: number;
  donationType: string;
  address: string;
  zipCode: string;
  donationMethod: string;
  boxSize: string;
  numBoxes: number;
  estimatedValue: number;
  wantsToContribute: boolean;
  contributionAmount: number;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

const DONATION_STEPS = [
  'Welcome',
  'Type Selection',
  'Address Input',
  'Method Selection',
  'Details & Value',
  'Contribution',
  'Confirmation'
];

const DonationPlatform = () => {
  const { toast } = useToast();
  const [donationState, setDonationState] = useState<DonationState>({
    step: 0,
    donationType: '',
    address: '',
    zipCode: '',
    donationMethod: '',
    boxSize: '',
    numBoxes: 1,
    estimatedValue: 0,
    wantsToContribute: false,
    contributionAmount: 0,
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    }
  });

  const updateState = (updates: Partial<DonationState>) => {
    setDonationState(prev => ({ ...prev, ...updates }));
  };

  const updateContactInfo = (field: keyof DonationState['contactInfo'], value: string) => {
    setDonationState(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (donationState.step < DONATION_STEPS.length - 1) {
      updateState({ step: donationState.step + 1 });
    }
  };

  const prevStep = () => {
    if (donationState.step > 0) {
      updateState({ step: donationState.step - 1 });
    }
  };

  const handleSubmitDonation = () => {
    toast({
      title: "Donation Submitted Successfully!",
      description: "Thank you for your generous donation. You will receive a confirmation email shortly.",
    });
    // In production, this would submit to the database
  };

  const BOX_SIZES = [
    { id: 'standard', name: 'Standard Box', dimensions: '18" × 18" × 24"', price: 20 },
    { id: 'large', name: 'Large Box', dimensions: '18" × 24" × 36"', price: 30 }
  ];

  const NEARBY_CENTERS = [
    { name: 'Downtown Collection Center', address: '123 Main St, Downtown', distance: '2.5 miles', hours: 'Mon-Fri 9AM-6PM' },
    { name: 'Westside Community Hub', address: '456 West Ave, Westside', distance: '4.1 miles', hours: 'Mon-Sat 8AM-8PM' },
    { name: 'Northshore Drop-off', address: '789 North Blvd, Northshore', distance: '6.8 miles', hours: 'Daily 10AM-4PM' }
  ];

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {DONATION_STEPS.map((step, index) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-smooth ${
            index <= donationState.step 
              ? 'bg-primary text-primary-foreground shadow-card' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {index + 1}
          </div>
          {index < DONATION_STEPS.length - 1 && (
            <div className={`w-12 h-1 mx-2 rounded transition-smooth ${
              index < donationState.step ? 'bg-primary' : 'bg-muted'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Step 0: Welcome
  const WelcomeStep = () => (
    <div className="text-center space-y-6">
      <div className="relative overflow-hidden rounded-2xl">
        <img 
          src={heroImage} 
          alt="Akhuwat USA Charity Donation" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Donate Your Used Clothes</h1>
          <p className="text-white/90">Help families in Pakistan with your generous donations</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card className="text-center p-4">
          <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Make a Difference</h3>
          <p className="text-sm text-muted-foreground">Your clothes can change lives</p>
        </Card>
        <Card className="text-center p-4">
          <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Tax Deductible</h3>
          <p className="text-sm text-muted-foreground">Get proper receipts for tax benefits</p>
        </Card>
        <Card className="text-center p-4">
          <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Trusted Process</h3>
          <p className="text-sm text-muted-foreground">Transparent and reliable delivery</p>
        </Card>
      </div>

      <Button variant="hero" size="xl" onClick={nextStep} className="animate-gentle-bounce">
        Start Your Donation
        <Heart className="w-5 h-5" />
      </Button>
    </div>
  );

  // Step 1: Type Selection
  const TypeSelectionStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">What would you like to donate?</h2>
        <p className="text-muted-foreground">Select the type of items you're donating</p>
      </div>

      <RadioGroup 
        value={donationState.donationType} 
        onValueChange={(value) => updateState({ donationType: value })}
        className="grid grid-cols-1 gap-4"
      >
        <Label htmlFor="clothes" className="cursor-pointer">
          <Card className={`p-6 transition-smooth hover:shadow-elegant ${
            donationState.donationType === 'clothes' ? 'ring-2 ring-primary bg-primary/5' : ''
          }`}>
            <div className="flex items-center space-x-4">
              <RadioGroupItem value="clothes" id="clothes" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Used Clothes</h3>
                <p className="text-muted-foreground">Shirts, pants, dresses, jackets, and other clothing items</p>
                <Badge variant="outline" className="mt-2">Available Now</Badge>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </Label>

        <Label htmlFor="shoes" className="cursor-pointer opacity-60">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <RadioGroupItem value="shoes" id="shoes" disabled />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Shoes</h3>
                <p className="text-muted-foreground">All types of footwear</p>
                <Badge variant="secondary" className="mt-2">Coming Soon</Badge>
              </div>
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
          </Card>
        </Label>

        <Label htmlFor="blankets" className="cursor-pointer opacity-60">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <RadioGroupItem value="blankets" id="blankets" disabled />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Blankets & Bedding</h3>
                <p className="text-muted-foreground">Blankets, sheets, and bedding items</p>
                <Badge variant="secondary" className="mt-2">Coming Soon</Badge>
              </div>
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
          </Card>
        </Label>
      </RadioGroup>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button 
          onClick={nextStep} 
          disabled={!donationState.donationType}
          variant={donationState.donationType ? "default" : "outline"}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 2: Address Input
  const AddressInputStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Enter Your Location</h2>
        <p className="text-muted-foreground">We'll find the best donation options near you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code *</Label>
          <Input 
            id="zipCode"
            placeholder="12345"
            value={donationState.zipCode}
            onChange={(e) => updateState({ zipCode: e.target.value })}
            maxLength={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Full Address (Optional)</Label>
          <Input 
            id="address"
            placeholder="123 Main Street, City, State"
            value={donationState.address}
            onChange={(e) => updateState({ address: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button 
          onClick={nextStep} 
          disabled={donationState.zipCode.length < 5}
          variant={donationState.zipCode.length >= 5 ? "default" : "outline"}
        >
          Find Options
        </Button>
      </div>
    </div>
  );

  // Step 3: Method Selection
  const MethodSelectionStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">How would you like to donate?</h2>
        <p className="text-muted-foreground">Choose between drop-off or pickup service</p>
      </div>

      <RadioGroup 
        value={donationState.donationMethod} 
        onValueChange={(value) => updateState({ donationMethod: value })}
        className="space-y-4"
      >
        {/* Drop-off Option */}
        <Label htmlFor="dropoff" className="cursor-pointer">
          <Card className={`p-6 transition-smooth hover:shadow-elegant ${
            donationState.donationMethod === 'dropoff' ? 'ring-2 ring-primary bg-primary/5' : ''
          }`}>
            <div className="flex items-start space-x-4">
              <RadioGroupItem value="dropoff" id="dropoff" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Drop-off at Collection Center</h3>
                  <Badge variant="success">Free</Badge>
                </div>
                <p className="text-muted-foreground mb-4">Bring your donation to one of our nearby centers</p>
                
                <div className="space-y-3">
                  {NEARBY_CENTERS.map((center, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{center.name}</p>
                        <p className="text-sm text-muted-foreground">{center.address}</p>
                        <p className="text-sm text-primary">{center.hours}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{center.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Label>

        {/* UPS Pickup Option */}
        <Label htmlFor="pickup" className="cursor-pointer">
          <Card className={`p-6 transition-smooth hover:shadow-elegant ${
            donationState.donationMethod === 'pickup' ? 'ring-2 ring-primary bg-primary/5' : ''
          }`}>
            <div className="flex items-start space-x-4">
              <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">UPS Pickup Service</h3>
                  <Badge variant="warning">Shipping Cost</Badge>
                </div>
                <p className="text-muted-foreground mb-4">We'll arrange UPS pickup from your location</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {BOX_SIZES.map((box) => (
                    <div key={box.id} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">{box.name}</p>
                      <p className="text-sm text-muted-foreground">{box.dimensions}</p>
                      <p className="text-sm text-primary font-medium">${box.price} shipping contribution</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Label>
      </RadioGroup>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button 
          onClick={nextStep} 
          disabled={!donationState.donationMethod}
          variant={donationState.donationMethod ? "default" : "outline"}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 4: Details & Value
  const DetailsValueStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Donation Details</h2>
        <p className="text-muted-foreground">Please provide details about your donation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-primary" />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name"
                placeholder="John Doe"
                value={donationState.contactInfo.name}
                onChange={(e) => updateContactInfo('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email"
                type="email"
                placeholder="john@example.com"
                value={donationState.contactInfo.email}
                onChange={(e) => updateContactInfo('email', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone"
                placeholder="(555) 123-4567"
                value={donationState.contactInfo.phone}
                onChange={(e) => updateContactInfo('phone', e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Donation Details */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary" />
            Donation Details
          </h3>
          <div className="space-y-4">
            {donationState.donationMethod === 'pickup' && (
              <>
                <div>
                  <Label htmlFor="boxSize">Box Size</Label>
                  <RadioGroup 
                    value={donationState.boxSize} 
                    onValueChange={(value) => updateState({ boxSize: value })}
                    className="mt-2"
                  >
                    {BOX_SIZES.map((box) => (
                      <div key={box.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={box.id} id={box.id} />
                        <Label htmlFor={box.id} className="flex-1 cursor-pointer">
                          <span className="font-medium">{box.name}</span>
                          <span className="text-muted-foreground ml-2">({box.dimensions})</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="numBoxes">Number of Boxes</Label>
                  <Input 
                    id="numBoxes"
                    type="number"
                    min="1"
                    max="10"
                    value={donationState.numBoxes}
                    onChange={(e) => updateState({ numBoxes: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="estimatedValue">Estimated Value ($) *</Label>
              <Input 
                id="estimatedValue"
                type="number"
                min="0"
                step="25"
                placeholder="150"
                value={donationState.estimatedValue || ''}
                onChange={(e) => updateState({ estimatedValue: parseInt(e.target.value) || 0 })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Fair market value for tax deduction purposes
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tax Information */}
      <Card className="p-6 bg-accent/10 border-accent/20">
        <h3 className="font-semibold mb-2 flex items-center text-accent-foreground">
          <FileText className="w-5 h-5 mr-2" />
          Tax Deduction Information
        </h3>
        <div className="text-sm text-accent-foreground/80 space-y-2">
          <p>• You may deduct the fair market value of your donated items</p>
          <p>• For donations over $500, IRS Form 8283 may be required</p>
          <p>• For donations over $5,000, a written appraisal is recommended</p>
          <p>• Please consult your tax advisor for specific guidance</p>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button 
          onClick={nextStep} 
          disabled={!donationState.contactInfo.name || !donationState.contactInfo.email || !donationState.estimatedValue}
          variant={donationState.contactInfo.name && donationState.contactInfo.email && donationState.estimatedValue ? "default" : "outline"}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 5: Contribution
  const ContributionStep = () => {
    const baseContribution = donationState.donationMethod === 'pickup' 
      ? BOX_SIZES.find(box => box.id === donationState.boxSize)?.price || 20
      : 0;
    const totalBoxCost = baseContribution * donationState.numBoxes;

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Support Our Mission</h2>
          <p className="text-muted-foreground">
            Help us cover operational costs to ensure your donation reaches those in need
          </p>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-primary" />
            Contribution Breakdown
          </h3>
          
          <div className="space-y-3">
            {donationState.donationMethod === 'pickup' && (
              <div className="flex justify-between">
                <span>Shipping Cost ({donationState.numBoxes} box{donationState.numBoxes > 1 ? 'es' : ''})</span>
                <span className="font-medium">${totalBoxCost}</span>
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="contribute"
                  checked={donationState.wantsToContribute}
                  onCheckedChange={(checked) => updateState({ wantsToContribute: checked as boolean })}
                />
                <Label htmlFor="contribute" className="font-medium">
                  I'd like to contribute toward operational costs
                </Label>
              </div>
              
              {donationState.wantsToContribute && (
                <div className="ml-6 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 20, 50].map((amount) => (
                      <Button
                        key={amount}
                        variant={donationState.contributionAmount === amount ? "default" : "outline"}
                        onClick={() => updateState({ contributionAmount: amount })}
                        size="sm"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <div>
                    <Label htmlFor="customAmount">Custom Amount</Label>
                    <Input 
                      id="customAmount"
                      type="number"
                      placeholder="Enter amount"
                      value={donationState.contributionAmount || ''}
                      onChange={(e) => updateState({ contributionAmount: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              )}
            </div>

            <Separator />
            
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span>${totalBoxCost + (donationState.wantsToContribute ? donationState.contributionAmount : 0)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h4 className="font-medium mb-2">Your contribution helps fund:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Collection and sorting operations in the USA</li>
            <li>• Container shipping to Pakistan</li>
            <li>• Port clearance and customs processing</li>
            <li>• Last-mile delivery to families in need</li>
          </ul>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep} variant="default">
            Review & Submit
          </Button>
        </div>
      </div>
    );
  };

  // Step 6: Confirmation
  const ConfirmationStep = () => {
    const baseContribution = donationState.donationMethod === 'pickup' 
      ? BOX_SIZES.find(box => box.id === donationState.boxSize)?.price || 20
      : 0;
    const totalBoxCost = baseContribution * donationState.numBoxes;
    const totalAmount = totalBoxCost + (donationState.wantsToContribute ? donationState.contributionAmount : 0);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Review Your Donation</h2>
          <p className="text-muted-foreground">Please review all details before submitting</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Donation Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium">Used Clothes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method:</span>
                <span className="font-medium capitalize">{donationState.donationMethod}</span>
              </div>
              {donationState.donationMethod === 'pickup' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Box Size:</span>
                    <span className="font-medium">
                      {BOX_SIZES.find(box => box.id === donationState.boxSize)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Number of Boxes:</span>
                    <span className="font-medium">{donationState.numBoxes}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Value:</span>
                <span className="font-medium">${donationState.estimatedValue}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{donationState.contactInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{donationState.contactInfo.email}</span>
              </div>
              {donationState.contactInfo.phone && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{donationState.contactInfo.phone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">ZIP Code:</span>
                <span className="font-medium">{donationState.zipCode}</span>
              </div>
            </div>
          </Card>
        </div>

        {totalAmount > 0 && (
          <Card className="p-6 border-primary/20 bg-primary/5">
            <h3 className="font-semibold mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-primary" />
              Payment Summary
            </h3>
            <div className="space-y-2 text-sm">
              {donationState.donationMethod === 'pickup' && (
                <div className="flex justify-between">
                  <span>Shipping Cost:</span>
                  <span>${totalBoxCost}</span>
                </div>
              )}
              {donationState.wantsToContribute && (
                <div className="flex justify-between">
                  <span>Operational Contribution:</span>
                  <span>${donationState.contributionAmount}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span>${totalAmount}</span>
              </div>
            </div>
          </Card>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Back to Edit
          </Button>
          <div className="space-x-3">
            {totalAmount > 0 ? (
              <Button variant="hero" size="lg" onClick={handleSubmitDonation}>
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Payment
              </Button>
            ) : (
              <Button variant="success" size="lg" onClick={handleSubmitDonation}>
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit Donation
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const steps = [
    WelcomeStep,
    TypeSelectionStep,
    AddressInputStep,
    MethodSelectionStep,
    DetailsValueStep,
    ContributionStep,
    ConfirmationStep
  ];

  const CurrentStep = steps[donationState.step];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Akhuwat USA</h1>
          <p className="text-muted-foreground">Used Clothes Donation Platform</p>
        </div>

        {/* Step Indicator */}
        {donationState.step > 0 && <StepIndicator />}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-elegant animate-fade-in-up">
            <CurrentStep />
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2025 Akhuwat USA. All rights reserved. | Tax ID: 123-45-6789</p>
        </div>
      </div>
    </div>
  );
};

export default DonationPlatform;