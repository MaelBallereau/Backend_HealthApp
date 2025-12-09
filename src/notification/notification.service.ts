import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async CreateNotification() {
    return 'Notification created';
  }
}
