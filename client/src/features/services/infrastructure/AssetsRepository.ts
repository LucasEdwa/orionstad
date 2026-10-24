import type { ServiceId } from '../domain/serviceIds';
import livingRoomImg from '../../../assets/design-living-room.jpg';
import houseImg from '../../../assets/design-house.jpg';
import officeImg from '../../../assets/design-office.jpg';

// Same image per service as the design proposal
const SERVICE_IMAGES: Record<ServiceId, string> = {
  hemstadning: livingRoomImg,
  flyttstadning: houseImg,
  storstadning: livingRoomImg,
  fonsterputs: houseImg,
  kontorsstadning: officeImg,
  'extra-hjalp': livingRoomImg,
};

export class AssetsRepository {
  getServiceImage(id: ServiceId): string {
    return SERVICE_IMAGES[id];
  }
}
