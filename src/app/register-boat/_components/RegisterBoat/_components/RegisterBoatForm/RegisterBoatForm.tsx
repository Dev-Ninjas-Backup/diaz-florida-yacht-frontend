'use client';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

const RegisterBoatForm = () => {
  const [formData, setFormData] = useState({
    boatName: '',
    make: '',
    model: '',
    year: '',
    price: '',
    location: '',
    description: '',
    sellerName: '',
    email: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Boat registered successfully!');
      setFormData({
        boatName: '',
        make: '',
        model: '',
        year: '',
        price: '',
        location: '',
        description: '',
        sellerName: '',
        email: '',
        phone: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomContainer>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Register Your Boat</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="boatName">Boat Name</Label>
              <Input
                id="boatName"
                name="boatName"
                value={formData.boatName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                name="make"
                value={formData.make}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Seller Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sellerName">Name</Label>
                <Input
                  id="sellerName"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Submitting...' : 'Register Boat'}
            </Button>
          </div>
        </form>
      </div>
    </CustomContainer>
  );
};

export default RegisterBoatForm;
