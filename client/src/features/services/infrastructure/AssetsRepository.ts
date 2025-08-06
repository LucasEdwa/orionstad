import homeCleaningImg from '../../../assets/services6.jpg';
import homeCleaningImg2 from '../../../assets/services3.jpg';
import homeCleaningImg3 from '../../../assets/services2.jpg';
import officecleaningImg from '../../../assets/services8.jpg';
import officecleaningImg2 from '../../../assets/services5.jpg';
import specialCleaningImg from '../../../assets/services7.jpg';
import specialCleaningImg2 from '../../../assets/services4.jpg';
import orionLogo from '../../../assets/orion-logo.png';

export class AssetsRepository {
  getServiceImages(): string[][] {
    return [
      [homeCleaningImg, homeCleaningImg2, homeCleaningImg3],
      [officecleaningImg, officecleaningImg2],
      [specialCleaningImg, specialCleaningImg2],
    ];
  }

  getOrionLogo(): string {
    return orionLogo;
  }

  getImagesByCategory(category: 'home' | 'office' | 'specialized'): string[] {
    const imageMap = {
      home: [homeCleaningImg, homeCleaningImg2, homeCleaningImg3],
      office: [officecleaningImg, officecleaningImg2],
      specialized: [specialCleaningImg, specialCleaningImg2]
    };
    
    return imageMap[category] || [];
  }
}
