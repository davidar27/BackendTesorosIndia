export interface NotificationModel {
    notification_id?: number;
    user_id?: number;
    message?: string;
    type?: 'Cancelación' | 'Confirmación' | 'Reembolso' | 'General'
    send_date?: string
    status?: 'Vista' | 'No Vista'
}
