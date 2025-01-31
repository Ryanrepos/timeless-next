import { useState } from 'react';
import { NotificationsInquiry } from '../../types/notification/notification.input';
import { useQuery } from '@apollo/client';
import { GET_ALL_NOTIFICATIONS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import useDeviceDetect from '../../hooks/useDeviceDetect';

interface NotificationsProps {
	initialInput: NotificationsInquiry;
}

const NotificationTotal = (props: NotificationsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [total, setTotal] = useState<number>(0);
	const [limit, setLimit] = useState(initialInput.limit || 5); 

	const {
		loading: getNotificationsLoading,
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
			const totalCount = data?.getAllNotifications?.metaCounter?.[0]?.total ?? 0; 
			setTotal(totalCount);
		},
	});

	if (total === 0) {
		return null;
	}

	if (device === 'mobile') {
		return <div>Notification Mobile</div>;
	} else {
		return <div className={'notification-badge'}>{total > 20 ? '20+' : total}</div>;
	}
};

NotificationTotal.defaultProps = {
	initialInput: {
		page: 1,
		limit: 10,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default NotificationTotal;