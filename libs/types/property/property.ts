import { PropertyLocation, PropertyStatus, PropertyCategory, PropertyBrand } from '../../enums/property.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Property {
	_id: string;
	propertyCategory: PropertyCategory;
	propertyStatus: PropertyStatus;
	propertyLocation: PropertyLocation;
	propertyBrand: PropertyBrand;
	propertyAddress: string;
	propertyTitle: string;
	propertyPrice: number;
	propertyViews: number;
	propertyLikes: number;
	propertyComments: number;
	propertyRank: number;
	propertyImages: string[];
	propertyDesc?: string;
	propertyNew: boolean;
	propertyWorn: boolean;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Properties {
	list: Property[];
	metaCounter: TotalCounter[];
}
