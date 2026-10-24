import type { ServiceId } from '../domain/serviceIds';
// Photos from Unsplash (Unsplash License): Spacejoy 4YGsYQf7DNQ, EZcurtain Life eLMSYhpAGEI,
// Collov Home Design js8AQlw71HA, plus the house and office images from the design
import livingRoomImg from '../../../assets/living-room-bright.jpg';
import curtainsRoomImg from '../../../assets/living-room-curtains.jpg';
import sofaRoomImg from '../../../assets/living-room-sofa.jpg';
import houseImg from '../../../assets/design-house.jpg';
import officeImg from '../../../assets/design-office.jpg';

const SERVICE_IMAGES: Record<ServiceId, string> = {
  hemstadning: livingRoomImg,
  flyttstadning: houseImg,
  storstadning: curtainsRoomImg,
  fonsterputs: houseImg,
  kontorsstadning: officeImg,
  'extra-hjalp': sofaRoomImg,
};

export class AssetsRepository {
  getServiceImage(id: ServiceId): string {
    return SERVICE_IMAGES[id];
  }
}
