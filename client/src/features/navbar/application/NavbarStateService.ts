import type { NavbarState } from '../domain/entities/NavLink';

export class NavbarStateService {
  getInitialState(): NavbarState {
    return {
      isScrolled: false,
      sidebarOpen: false,
    };
  }

  shouldShowScrolledStyle(scrollY: number): boolean {
    return scrollY > 20;
  }
}
