import { FAQCategory, NoticeCategory, NoticeStatus } from "../../enums/notice.enum";
import { TotalCounter } from "../property/property";

export interface CsNotice {
    _id: string;
    noticeCategory: NoticeCategory;
    faqCategory:FAQCategory,
    noticeStatus: NoticeStatus;
    noticeTitle:String;
    noticeContent?:String;
    noticeEventDate?:string;
    memberId: string;
    createdAt:Date;
    updatedAt:Date;
}


export interface Notices {
	noticeCategory: string;
    list: CsNotice[];
    metaCounter: TotalCounter[];
}