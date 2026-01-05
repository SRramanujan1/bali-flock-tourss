import { BaseCrudService } from '@/integrations';
import { HolidayPackages } from '@/entities';

/**
 * Updates the bucks party package image
 * This is a one-time utility to update the main image for the bucks party package
 */
export async function updateBucksPartyImage() {
  try {
    // Fetch all packages to find the bucks party one
    const { items } = await BaseCrudService.getAll<HolidayPackages>('holidaypackages');
    
    // Find the bucks party package
    const bucksPartyPackage = items?.find(pkg => 
      pkg.packageName?.toLowerCase().includes('bucks') || 
      pkg.packageName?.toLowerCase().includes('stag')
    );

    if (!bucksPartyPackage) {
      console.warn('Bucks party package not found');
      return;
    }

    // Update the package with the new image
    await BaseCrudService.update<HolidayPackages>('holidaypackages', {
      _id: bucksPartyPackage._id,
      mainImage: 'https://static.wixstatic.com/media/b57044_df13c0125ba24ce2811564e2e6b41554~mv2.png?originWidth=1152&originHeight=576'
    });

    console.log('Bucks party package image updated successfully');
  } catch (error) {
    console.error('Error updating bucks party image:', error);
  }
}
