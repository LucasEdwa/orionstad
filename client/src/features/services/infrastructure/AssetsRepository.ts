import type { ServiceId } from '../domain/serviceIds';
// All photos supplied by the client: Hemstädning living room, Fönsterputs squeegee,
// and the Flyttstädning (empty rooms), Storstädning (lightbox, sink, tiles),
// Kontorsstädning (chairs, meeting room) and Extra hjälp (oven) slideshows.
import homeCleanLivingRoomImg from '../../../assets/home-clean-living-room.jpg';
import deepCleanLightboxImg from '../../../assets/deep-clean-lightbox.jpg';
import deepCleanSinkImg from '../../../assets/deep-clean-sink.jpg';
import deepCleanTilesImg from '../../../assets/deep-clean-tiles.jpg';
import windowCleanImg from '../../../assets/window-clean-squeegee.jpg';
import officeChairsImg from '../../../assets/office-clean-chairs.jpg';
import officeMeetingRoomImg from '../../../assets/office-clean-meeting-room.jpg';
import moveOutBalconyImg from '../../../assets/move-out-empty-room-balcony.jpg';
import moveOutOakImg from '../../../assets/move-out-empty-room-oak.jpg';
import moveOutWindowImg from '../../../assets/move-out-empty-room-window.jpg';
import extraHelpOvenWipeImg from '../../../assets/extra-help-oven-wipe.jpg';
import extraHelpOvenDoorImg from '../../../assets/extra-help-oven-door.jpg';
import extraHelpOvenRackImg from '../../../assets/extra-help-oven-rack.jpg';

// First image is the main one (detail page, first slide on the card)
const SERVICE_IMAGES: Record<ServiceId, string[]> = {
  hemstadning: [homeCleanLivingRoomImg],
  flyttstadning: [moveOutBalconyImg, moveOutOakImg, moveOutWindowImg],
  storstadning: [deepCleanLightboxImg, deepCleanSinkImg, deepCleanTilesImg],
  fonsterputs: [windowCleanImg],
  kontorsstadning: [officeChairsImg, officeMeetingRoomImg],
  'extra-hjalp': [extraHelpOvenWipeImg, extraHelpOvenDoorImg, extraHelpOvenRackImg],
};

export class AssetsRepository {
  getServiceImages(id: ServiceId): string[] {
    return SERVICE_IMAGES[id];
  }
}
