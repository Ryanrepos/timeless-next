import { PropertyLocation, PropertyStatus, PropertyCategory, PropertyBrand } from '../../enums/property.enum';

export interface PropertyUpdate {
	_id: string;
	propertyCategory?: PropertyCategory;
	propertyStatus?: PropertyStatus;
	propertyLocation?: PropertyLocation;
	propertyBrand?: PropertyBrand;
	propertyAddress?: string;
	propertyTitle?: string;
	propertyPrice?: number;
	propertyImages?: string[];
	propertyDesc?: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
