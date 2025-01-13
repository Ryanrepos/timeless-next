import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, Button} from '@mui/material';
import { List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { TabContext } from '@mui/lab';
import TablePagination from '@mui/material/TablePagination';
import { NoticeList } from '../../../libs/components/admin/cs/NoticeList';
import { sweetConfirmAlert, sweetErrorHandling } from '../../../libs/sweetAlert';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
// import { REMOVE_NOTICE, UPDATE_NOTICE } from '../../../apollo/admin/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../../libs/types/common';
import { NoticesInquiry } from '../../../libs/types/cs/csNoticeInput';
import { Notices } from '../../../libs/types/cs/csNotice';
import router from 'next/router';
import { GET_NOTICES_BY_ADMIN } from '../../../apollo/admin/query';
import { CsUpdate } from '../../../libs/types/cs/csUpdate';
import { REMOVE_NOTICE_BY_ADMIN, UPDATE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useRouter } from 'next/router';


const AdminNotice: NextPage = ({initialInquiry, ...props}: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [noticeInquiry, setNoticeInquiry] = useState<NoticesInquiry>(initialInquiry);
	const [notices, setNotices] = useState<Notices[]>([]);
	const [noticeTotal, setNoticeTotal] = useState<number>(0);
	const [value, setValue] = useState(
		noticeInquiry?.search?.noticeStatus ? noticeInquiry?.search?.noticeStatus : 'ALL',
	);
	const router = useRouter();


	/** APOLLO REQUESTS **/
	const [updateNotice] = useMutation(UPDATE_NOTICE_BY_ADMIN);
	const [removeNotice] = useMutation(REMOVE_NOTICE_BY_ADMIN);
	
	const {
		loading: getNoticesLoading,
		data: getNotices,
		error: getNoticesError,
		refetch:getNoticesRefetch
	} = useQuery(GET_NOTICES_BY_ADMIN, {
		fetchPolicy:'network-only',
		variables:{ input: noticeInquiry },
		notifyOnNetworkStatusChange:true,
		onCompleted:(data: T) => {
			setNotices(data?.getNoticesByAdmin?.list),
			setNoticeTotal(data?.getNoticesByAdmin?.metaCounter?.[0]?.total ?? 0)
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
				noticeCategory = NoticeCategory.EVENT;
				break;
			case 'ACTIVE':
				setNoticeInquiry({ ...noticeInquiry, search: { noticeStatus: NoticeStatus.ACTIVE } });
				noticeCategory = NoticeCategory.EVENT;
				break;
			case 'DELETE':
				setNoticeInquiry({ ...noticeInquiry, search: { noticeStatus: NoticeStatus.DELETE } });
				noticeCategory = NoticeCategory.EVENT;
				break;
			default:
				delete noticeInquiry?.search?.noticeStatus;
				setNoticeInquiry({ ...noticeInquiry });
				noticeCategory = NoticeCategory.EVENT;
				break;
		}
		setNoticeInquiry(prevState => ({
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

	const createNoticePage = () => {
		router.push("/_admin/cs/createNotice");
	}
	
	return (
		// @ts-ignore
		<Box component={'div'} className={'content'}  style={{ minHeight:'1300px' }}>
			<Box component={'div'} className={'title flex_space'}>
				<Typography 
					sx={{background: "gray", 
					padding: "10px",
					color: "white",
					borderRadius: 5
				}}
				variant={'h2'}>Notice Management</Typography>
				<Button onClick={createNoticePage} sx={{
				color: "white",
				margin: "10px",
				borderRadius: 5
			}} variant="contained" color="success">
				<NoteAddIcon sx={{height: "17px"}}/>
				Create Notice
			</Button>
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
						<NoticeList
							notices = {notices}
							updateNoticeHandler = {updateNoticeHandler}
							removeNoticeHandler = {removeNoticeHandler}
							menuIconClickHandler={menuIconClickHandler}
							menuIconCloseHandler={menuIconCloseHandler}
							anchorEl={anchorEl}
						/>

						<TablePagination
							rowsPerPageOptions={[20, 40, 60]}
							component="div"
							count={noticeTotal}
							rowsPerPage={noticeInquiry?.limit}
							page={noticeInquiry?.page - 1}
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
            noticeCategory: NoticeCategory.EVENT
        },
    },
};

export default withAdminLayout(AdminNotice);