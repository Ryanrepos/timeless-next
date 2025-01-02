import { FAQCategory, NoticeCategory, NoticeStatus } from "../../enums/notice.enum";

export interface NoticeInput {
    noticeCategory: NoticeCategory;
    faqCategory?: FAQCategory,
    noticeTitle: string;
    noticeContent?: string;
    noticeEventDate?: string;
    memberId?: string;
};

interface NSearch {
    noticeStatus?: NoticeStatus;
    noticeCategory?: NoticeCategory;
    faqCategory?: FAQCategory,
};

export interface NoticesInquiry {
   page:number;
   limit:number;
   sort?:string;
   search: NSearch;
};