import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';

export interface Notification {
	_id: string;
	notificationType: NotificationType;
	notificationStatus: NotificationStatus;
	notificationGroup: NotificationGroup;
	notificationTitle: string;
	notificationDesc?: string;
	authorId: string;
	receiverId: string;
	productId?: string;
	articleId?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Notifications {
	list: Notification[];
	metaCounter?: TotalCounter[];
}

export interface TotalCounter {
	name: string;
	count: number;
}