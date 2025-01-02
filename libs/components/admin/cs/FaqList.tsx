import React from 'react';
import { useRouter } from 'next/router';
import {TableCell,TableHead,TableBody,TableRow,Table,TableContainer,Button,Menu,Fade,MenuItem} from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { NoticeStatus } from '../../../enums/notice.enum';
import DeleteIcon from '@mui/icons-material/Delete';
import Moment from 'react-moment';
import { Notices } from '../../../types/cs/csNotice';

interface Data {
	category: string;
	title: string;
	writer: string;
	date: string;
	status: string;
	id?: string;
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'category',
		numeric: true,
		disablePadding: false,
		label: 'CATEGORY',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'QUESTION',
	},

	{
		id: 'writer',
		numeric: true,
		disablePadding: false,
		label: 'ANSWER',
	},
	{
		id: 'date',
		numeric: true,
		disablePadding: false,
		label: 'DATE',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
	},
];

function EnhancedTableHead() {

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface FaqArticlesPanelListType {
	notices: Notices[];
	updateNoticeHandler:any;
	removeNoticeHandler:any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	dense?: boolean;
	anchorEl?: any;
}

export const FaqArticlesPanelList = (props: FaqArticlesPanelListType) => {
	const {
		notices = [],
		updateNoticeHandler,
		removeNoticeHandler,
		menuIconClickHandler, 
		menuIconCloseHandler,
		dense,
		anchorEl,
	} = props;
	const router = useRouter();

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	/** HANDLERS **/

	return (
		<Stack  sx={{ minHeigh: 1300 }}>
			<TableContainer >
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{notices.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={8}>
									<span className={'no-data'}>data not found!</span>
								</TableCell>
							</TableRow>
						)}

						{notices.length !== 0 &&
							notices.map((notice:any, index: number) => (
							<TableRow hover key={'member._id'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="left">{notice.faqCategory}</TableCell>
									<TableCell align="left">{notice.noticeTitle}</TableCell>
									<TableCell align="left">{notice.noticeContent}</TableCell>
									<TableCell align="left">
										<Moment format={'DD.MM.YY HH:mm'}>{notice?.createdAt}</Moment>
									</TableCell>
									<TableCell align="center">
										{notice.noticeStatus === 'DELETE' ? (
											<Button
												variant="outlined"
												sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
												onClick={() => removeNoticeHandler(notice._id)}
											>
												<DeleteIcon fontSize="small" />
											</Button>
										) : (
											<>
												<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
													{notice.noticeStatus}
												</Button>

												<Menu
													className={'menu-modal'}
													MenuListProps={{
														'aria-labelledby': 'fade-button',
													}}
													anchorEl={anchorEl[index]}
													open={Boolean(anchorEl[index])}
													onClose={menuIconCloseHandler}
													TransitionComponent={Fade}
													sx={{ p: 1 }}
												>
													{Object.values(NoticeStatus)
														.filter((ele) => ele !== notice.noticeStatus)
														.map((status: string) => (
															<MenuItem
																onClick={() => updateNoticeHandler({ _id: notice._id, noticeStatus: status })}
																key={status}
															>
																<Typography variant={'subtitle1'} component={'span'}>
																	{status}
																</Typography>
															</MenuItem>
														))}
												</Menu>
											</>
										)}
									</TableCell>
							</TableRow>
						))
					}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};