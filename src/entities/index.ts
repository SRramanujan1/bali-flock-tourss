/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: holidaypackages
 * Interface for HolidayPackages
 */
export interface HolidayPackages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  packageName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  groupType?: string;
  /** @wixFieldType text */
  holidayStyle?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  duration?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType text */
  itinerary?: string;
  /** @wixFieldType text */
  inclusions?: string;
}
