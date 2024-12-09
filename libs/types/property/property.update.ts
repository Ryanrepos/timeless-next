import { PropertyLocation, PropertyStatus, PropertyCategory, PropertyBrand } from '../../enums/property.enum';

export interface PropertyUpdate {
	_id: string;
	propertyType?: PropertyCategory;
	propertyStatus?: PropertyStatus;
	propertyLocation?: PropertyLocation;
	propertyBrand?: PropertyBrand;
	propertyAddress?: string;
	propertyTitle?: string;
	propertyPrice?: number;
	propertyImages?: string[];
	propertyDesc?: string;
	propertyNew?: boolean;
	propertyWorn?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
