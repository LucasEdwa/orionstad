import type { ScrollService } from '../domain/repositories/HeroRepository';

export class BrowserScrollService implements ScrollService {
  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  scrollToSelector(selector: string): void {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}
