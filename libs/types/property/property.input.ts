import { PropertyBrand, PropertyCategory, PropertyLocation, PropertyStatus } from '../../enums/property.enum';
import { Direction } from '../../enums/common.enum';

export interface PropertyInput {
	propertyCategory: PropertyCategory;
	propertyLocation: PropertyLocation;
	propertyBrand: PropertyBrand;
	propertyAddress: string;
	propertyTitle: string;
	propertyPrice: number;
	propertyImages: string[];
	propertyDesc?: string;
	propertyNew?: boolean;
	propertyWorn?: boolean;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	memberId?: string;
	locationList?: PropertyLocation[];
	categoryList?: PropertyCategory[];
	brandList?: string[];
	options?: string[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	text?: string;
}

export interface PropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	propertyStatus?: PropertyStatus;
}

export interface AgentPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	propertyStatus?: PropertyStatus;
	propertyLocationList?: PropertyLocation[];
}

export interface AllPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
