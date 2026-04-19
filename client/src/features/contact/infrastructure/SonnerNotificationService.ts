import { showSuccess, showError } from '../../../utils/sweetAlert';
import type { NotificationService } from '../domain/repositories/ContactRepository';

export class SonnerNotificationService implements NotificationService {
  showSuccess(message: string): void {
    showSuccess(message);
  }

  showError(message: string): void {
    showError(message);
  }
}
