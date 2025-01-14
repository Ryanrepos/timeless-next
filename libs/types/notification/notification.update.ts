import { NotificationStatus } from '../../enums/notification.enum';

export interface NotificationUpdate {
	_id: string;
	notificationStatus?: NotificationStatus;
}