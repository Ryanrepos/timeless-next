import React from 'react';
import { useRouter } from 'next/router';
import {TableCell,TableHead,TableBody,TableRow,Table,TableContainer,Button,Menu,Fade,MenuItem,} from '@mui/material';
import { IconButton, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { NotePencil } from 'phosphor-react';
import { NoticeStatus } from '../../../enums/notice.enum';
import { CsNotice } from '../../../types/cs/csNotice';

interface Data {
	category: string;
	title: string;
	id: string;
	content: string;
	date: string;
	status: string;
	action: string;
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
		label: 'Category',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'content',
		numeric: true,
		disablePadding: false,
		label: 'Content',
	},
	{
		id: 'status',
		numeric: true,
		disablePadding: false,
		label: 'STATUS',
	},
	{
		id: 'action',
		numeric: false,
		disablePadding: false,
		label: 'ACTION',
	},
];

const EnhancedTableToolbar = () => {

	return (
		<>
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
		</>
	);
};

interface NoticeListType {
	notices:any,
	updateNoticeHandler:any,
	removeNoticeHandler:any,
	menuIconClickHandler:any, 
	menuIconCloseHandler:any,
	dense?: boolean;
	anchorEl?: any;
}

export const TermsList = (props: NoticeListType) => {
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
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableToolbar />
					<TableBody>
					{notices.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={8}>
									<span className={'no-data'}>data not found!</span>
								</TableCell>
							</TableRow>
						)}
					{notices.length !== 0 &&
						notices.map((notice: CsNotice, index: number) => (
								<TableRow hover key={'member._id'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="left">{notice.noticeCategory}</TableCell>
									<TableCell align="left">{notice.noticeTitle}</TableCell>
									<TableCell align="left">{notice.noticeContent ?? 'None'}</TableCell>
									<TableCell align="left">
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
									</TableCell>
									<TableCell align="center">
										<Tooltip title={'delete'}>
											<IconButton>
												<DeleteRoundedIcon 
												onClick={() => removeNoticeHandler(notice._id)}/>
											</IconButton>
										</Tooltip>
										<Tooltip title="edit">
											<IconButton onClick={() => router.push(`/_admin/cs/_create?id=${notice._id}`)}>
												<NotePencil size={24} weight="fill" />
											</IconButton>
										</Tooltip>
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