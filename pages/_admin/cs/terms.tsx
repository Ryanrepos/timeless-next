import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box } from '@mui/material';
import { List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { TabContext } from '@mui/lab';
import TablePagination from '@mui/material/TablePagination';
import { sweetConfirmAlert, sweetErrorHandling } from '../../../libs/sweetAlert';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
// import { REMOVE_NOTICE, UPDATE_NOTICE } from '../../../apollo/admin/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../../libs/types/common';
import { TermsList } from '../../../libs/components/admin/cs/TermsList';
import { useRouter } from 'next/router';
import { NoticesInquiry } from '../../../libs/types/cs/csNoticeInput';
import { Notices } from '../../../libs/types/cs/csNotice';
import { GET_NOTICES_BY_ADMIN } from '../../../apollo/admin/query';
import { REMOVE_NOTICE_BY_ADMIN, UPDATE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';
import { CsUpdate } from '../../../libs/types/cs/csUpdate';

const AdminNotice: NextPage = ({initialInquiry, ...props}: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [noticeInquiry, setNoticeInquiry] = useState<NoticesInquiry>(initialInquiry);
	const [notices, setNotices] = useState<Notices[]>([]);
	const [noticeTotal, setNoticeTotal] = useState<number>(0);
	const [value, setValue] = useState(
		noticeInquiry?.search?.noticeStatus ? noticeInquiry?.search?.noticeStatus : 'ALL',
	);

	/** APOLLO REQUESTS **/
	const [updateNotice] = useMutation(UPDATE_NOTICE_BY_ADMIN);
	const [removeNotice] = useMutation(REMOVE_NOTICE_BY_ADMIN);
	
	const {
		loading: getNotices,
		data: getNoticesData,
		error: getNoticesError,
		refetch:getNoticesRefetch
	} = useQuery(GET_NOTICES_BY_ADMIN, {
		fetchPolicy:'network-only',
		variables:{ input: noticeInquiry },
		notifyOnNetworkStatusChange:true,
		onCompleted:(data:T) => {
			setNotices(data?.getNotices?.list),
			setNoticeTotal(data?.getNotices?.metaCounter?.[0]?.total ?? 0)
		},
	});
	
	/** LIFECYCLES **/
	useEffect(() =>{
		getNoticesRefetch({input:noticeInquiry}).then();
	}, [noticeInquiry]);

	/** HANDLERS **/
	const changePageHandler = async (event:unknown, newPage:number) =>{
		noticeInquiry.page  = newPage +1;
		await getNoticesRefetch({input:noticeInquiry});
		setNoticeInquiry({...noticeInquiry});
	};

	const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		noticeInquiry.limit = parseInt(event.target.value, 10);
		noticeInquiry.page = 1;
		await getNoticesRefetch({input:noticeInquiry});
		setNoticeInquiry({ ...noticeInquiry });
	};

	const menuIconClickHandler = (e: any, index: number) => {
		const tempAnchor = anchorEl.slice();
		tempAnchor[index] = e.currentTarget;
		setAnchorEl(tempAnchor);
	};

	const menuIconCloseHandler = () => {
		setAnchorEl([]);
	};

	const handleTabChange = async (event: any, newValue: string) => {
		setValue(newValue);

		setNoticeInquiry({ ...noticeInquiry, page: 1, sort: 'createdAt' });
		let noticeCategory:NoticeCategory;
		switch (newValue) {
			case 'HOLD':
				setNoticeInquiry({ ...noticeInquiry, search: { noticeStatus: NoticeStatus.HOLD } });
				noticeCategory = NoticeCategory.TERMS;
				break;
			case 'ACTIVE':
				setNoticeInquiry({ ...noticeInquiry, search: { noticeStatus: NoticeStatus.ACTIVE } });
				noticeCategory = NoticeCategory.TERMS;
				break;
			case 'DELETE':
				setNoticeInquiry({ ...noticeInquiry, search: { noticeStatus: NoticeStatus.DELETE } });
				noticeCategory = NoticeCategory.TERMS;
				break;
			default:
				delete noticeInquiry?.search?.noticeStatus;
				setNoticeInquiry({ ...noticeInquiry });
				noticeCategory = NoticeCategory.TERMS;
				break;
		}
		// TODO 
		setNoticeInquiry((prevState: any) => ({
			...prevState,
			search: {
				...prevState.search,
				noticeCategory: noticeCategory 
			}
		}));
	};

	const updateNoticeHandler = async (updateData: CsUpdate) => {
		try{
			await updateNotice({
				variables: {
					input:updateData,
				},
			});
			menuIconCloseHandler();
			await getNoticesRefetch({input:noticeInquiry});

		}catch(err: any) {
			menuIconCloseHandler();
			sweetErrorHandling(err).then();
		}
	};

	const removeNoticeHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to remove?')) {
				await removeNotice({
					variables: { input:id }
				});
				await getNoticesRefetch({input:noticeInquiry});
			}
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}; 
	
	return (
		// @ts-ignore
		<Box component={'div'} className={'content'}  style={{ minHeight:'1300px' }}>
			<Box component={'div'} className={'title flex_space'}>
				<Typography variant={'h2'}>Terms Management</Typography>
			</Box>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={'value'}>
					<Box component={'div'}>
							<List className={'tab-menu'}>
								<ListItem
									onClick={(e) => handleTabChange(e, 'ALL')}
									value="ALL"
									className={value === 'ALL' ? 'li on' : 'li'}
								>
									All 
								</ListItem>
								<ListItem
									onClick={(e) => handleTabChange(e, 'HOLD')}
									value="HOLD"
									className={value === 'HOLD' ? 'li on' : 'li'}
								>
									Hold 
								</ListItem>
								<ListItem
									onClick={(e) => handleTabChange(e, 'ACTIVE')}
									value="ACTIVE"
									className={value === 'ACTIVE' ? 'li on' : 'li'}
								>
									Active
								</ListItem>
								<ListItem
									onClick={(e) => handleTabChange(e, 'DELETE')}
									value="DELETE"
									className={value === 'DELETE' ? 'li on' : 'li'}
								>
									Deleted
								</ListItem>
							</List>
							<Divider />
						</Box>
						<TermsList
							notices = {notices}
							updateNoticeHandler = {updateNoticeHandler}
							removeNoticeHandler = {removeNoticeHandler}
							menuIconClickHandler={menuIconClickHandler}
							menuIconCloseHandler={menuIconCloseHandler}
							anchorEl={anchorEl}
						/>

						<TablePagination
							rowsPerPageOptions={[10,20, 40, 60]}
							component="div"
							count={noticeTotal}
							rowsPerPage={noticeInquiry?.limit}
							page={noticeInquiry?.page-1}
							onPageChange={changePageHandler}
							onRowsPerPageChange={changeRowsPerPageHandler}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

AdminNotice.defaultProps = {
    initialInquiry: {
        page: 1,
        limit: 10,
        sort: 'createdAt',
        search: {
            noticeCategory: NoticeCategory.TERMS
        },
    },
};

export default withAdminLayout(AdminNotice);