import { Button, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_NOTIFICATIONS } from '../../../apollo/user/query';
import { DELETE_NOTIFICATION, MARK_AS_READ } from '../../../apollo/user/mutation';
import { T } from '../../types/common';
import { useState } from 'react';
import { NotificationsInquiry } from '../../types/notification/notification.input';
import { Notification } from '../../types/notification/notification';

interface NotificationsProps {
	initialInput: NotificationsInquiry;
}

const NotifacationContent = (props: NotificationsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [total, setTotal] = useState<number>(0);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [limit, setLimit] = useState(initialInput.limit || 4); // Maintain dynamic limit state

	// APOLLO REQUEST
	const [deleteNotification] = useMutation(DELETE_NOTIFICATION);

	const {
		loading: getNotifications,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(GET_ALL_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: {
				...initialInput,
				limit, 
			},
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNotifications(data?.getAllNotifications?.list);
			setTotal(data?.getAllNotifications?.metaCounter[0].total);
		},
	});

	const [markAllAsRead] = useMutation(MARK_AS_READ, {
		onCompleted: () => {
			console.log('All notifications marked as READ');
			setNotifications([]); 
		},
		onError: (error) => console.error('Mutation Error:', error),
	});

	// Handler to delete all notifications
	const handleMarkAllAsRead = async () => {
		try {
			const result = await markAllAsRead();
			if (result?.data?.MarkAsReadNofications) {
				console.log('Notifications successfully updated to READ');
			} else {
				console.error('No notifications were updated');
			}
		} catch (error) {
			console.error('Error executing mutation', error);
		}
	};

	const handleDeleteNotification = async (notificationId: string) => {
		try {
			await deleteNotification({
				variables: { input: notificationId },
			});
			console.log('Notification deleted successfully');
			// Refetch notifications after deletion to refresh UI
			const updatedNotifications = notifications.filter((notification) => notification._id !== notificationId);
			setNotifications(updatedNotifications);
		} catch (error) {
			console.error('Failed to delete notification:', error);
		}
	};

	if (notifications) console.log('notifications:', notifications);

	if (device === 'mobile') {
		return <div>Notification Mobile </div>;
	} else {
		return (
			<Stack className={'notification-content'}>
				<div className="notification-div">
					<Stack className={'notification-div-title'}>
						<Typography className={'notification-content-title'}>All Notifications</Typography>
					</Stack>
					<Stack className={'notifications'}>
						{notifications?.length === 0 ? (
							<div className={'no-data'}>
								<p>No notifications yet!</p>
							</div>
						) : (
							notifications?.map((notification: Notification) => (
								<Stack className={'notification-content-main'} key={notification._id}>
									<p className="notification-content-name">{notification.notificationTitle}</p>
									<Button
										className={'delete-btn'}
										style={{ padding: '0' }}
										onClick={() => handleDeleteNotification(notification._id)}
									>
                                        Close
									</Button>
								</Stack>
							))
						)}
					</Stack>
                    <Button className={'notification-del'}
                        onClick={handleMarkAllAsRead}>
						Mark As Read
					</Button>
				</div>
			</Stack>
		);
	}
};

NotifacationContent.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default NotifacationContent;