
import { NoticeCategory, NoticeStatus } from "../../enums/notice.enum";


export interface CsUpdate {

    _id:String;
    noticeCategory?: NoticeCategory;
    noticeStatus?:NoticeStatus;
    noticeTitle?:String;
    noticeContent?:String;
    noticeEventDate?:String;
    memberId?: String;
}