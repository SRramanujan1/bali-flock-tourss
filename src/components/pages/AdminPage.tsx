import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { HolidayPackages } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';

export default function AdminPage() {
  const [packages, setPackages] = useState<HolidayPackages[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { items } = await BaseCrudService.getAll<HolidayPackages>('holidaypackages');
        setPackages(items);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setMessage('Error loading packages');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleUpdateImage = async () => {
    if (!selectedPackageId || !newImageUrl) {
      setMessage('Please select a package and enter an image URL');
      return;
    }

    setUpdating(true);
    try {
      await BaseCrudService.update<HolidayPackages>('holidaypackages', {
        _id: selectedPackageId,
        mainImage: newImageUrl,
      });
      setMessage('Package image updated successfully!');
      setNewImageUrl('');
      setSelectedPackageId('');
      
      // Refresh packages
      const { items } = await BaseCrudService.getAll<HolidayPackages>('holidaypackages');
      setPackages(items);
    } catch (error) {
      console.error('Error updating package:', error);
      setMessage('Error updating package image');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-[100rem] mx-auto px-6 py-20 flex justify-center">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[100rem] mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Admin - Update Package Images</h1>

        <div className="bg-cardbackground rounded-lg p-8 max-w-2xl">
          <div className="space-y-6">
            {/* Package Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Select Package
              </label>
              <select
                value={selectedPackageId}
                onChange={(e) => setSelectedPackageId(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">-- Choose a package --</option>
                {packages.map((pkg) => (
                  <option key={pkg._id} value={pkg._id}>
                    {pkg.packageName}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                New Image URL
              </label>
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://static.wixstatic.com/media/..."
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Preview */}
            {newImageUrl && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Preview
                </label>
                <Image src={newImageUrl} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
              </div>
            )}

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-lg ${message.includes('success') ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                {message}
              </div>
            )}

            {/* Update Button */}
            <button
              onClick={handleUpdateImage}
              disabled={updating || !selectedPackageId || !newImageUrl}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-muted text-white font-bold py-3 rounded-lg transition-all duration-200"
            >
              {updating ? 'Updating...' : 'Update Package Image'}
            </button>
          </div>
        </div>

        {/* Current Packages List */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Current Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <div key={pkg._id} className="bg-cardbackground rounded-lg overflow-hidden">
                {pkg.mainImage && (
                  <Image src={pkg.mainImage} alt={pkg.packageName} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-2">{pkg.packageName}</h3>
                  <p className="text-sm text-muted mb-2">{pkg.description}</p>
                  <p className="text-xs text-muted-foreground break-all">{pkg.mainImage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
