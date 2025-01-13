import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { NoticeCategory } from '../../enums/notice.enum';
import { GET_NOTICES_BY_ADMIN } from '../../../apollo/admin/query';
import { Notices } from '../../types/cs/csNotice';
import { NoticesInquiry } from '../../types/cs/csNoticeInput';

const Terms = ({initialInquiry, ...props}:any) => {
	const device = useDeviceDetect();
	const [noticeInquiry, setNoticeInquiry] = useState<NoticesInquiry>(initialInquiry);
	const [notices, setNotices] = useState<Notices[]>([]);
	
	/** APOLLO REQUESTS **/
	const {
		loading: getNoticesLoading,
		data: getNoticesData,
		error: getNoticesError,
		refetch:getNoticesRefetch
	} = useQuery(GET_NOTICES_BY_ADMIN, {
		fetchPolicy:'cache-and-network',
		variables:{ input: noticeInquiry },
		notifyOnNetworkStatusChange:true,
		onCompleted:(data:T) => {
			setNotices(data?.getNoticesByAdmin?.list || [])
		},
	});
	/** LIFECYCLES **/

	/** HANDLERS **/
	const termsHandler = async (event: any, newValue: NoticeCategory) => {
		const updatedInquiry = {
			...noticeInquiry,
			search: {
				noticeCategory: newValue
			}
		};
		setNoticeInquiry(updatedInquiry);
		await getNoticesRefetch({ input: updatedInquiry });
	};
	

	if (device === 'mobile') {
		return <div>NOTICE MOBILE</div>;
	} else {
		return (
			<Stack className={'notice-content'}>
				<Stack className={'main'}>
					<Box component={'div'} className={'top'}>
						<span>Title</span>
						<span>Context</span>
						<span>Created At</span>
					</Box>
					<Stack className={'bottom'}>
						{notices.map((notice: any) => (
							<div className={`notice-card ${notice?.noticeCategory === NoticeCategory.EVENT && 'Event'}`} key={notice?.noticeTitle}>
								{notice?.noticeCategory === NoticeCategory.EVENT ? <div>event</div> : <span className={'notice-number'}>{notice?.noticeTitle}</span>}
								<span className={'notice-title'}>{notice?.noticeCategory === NoticeCategory.EVENT ? notice?.noticeTitle : notice?.noticeContent}</span>
								<span className={'notice-date'}>{notice?.noticeCategory === NoticeCategory.EVENT ? notice?.noticeEventDate : notice?.createdAt}</span>
							</div>
						))}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};
Terms.defaultProps = {
    initialInquiry: {
        page: 1,
        limit: 10,
        sort: 'createdAt',
        search: {
            noticeCategory: NoticeCategory.TERMS
        },
    },
};
export default Terms;