/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: activities
 * Interface for Activities
 */
export interface Activities {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  pricePerPerson?: number;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType image */
  activityImage?: string;
  /** @wixFieldType text */
  location?: string;
}


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
