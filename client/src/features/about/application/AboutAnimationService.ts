export class AboutAnimationService {
  getStaggeredDelay(index: number): string {
    return `${index * 150}ms`;
  }

  getSectionAnimationClass(index: number): string {
    const animations = [
      'animate-slide-in-left',
      'animate-slide-in-right',
      'animate-fade-in-up',
      'animate-slide-in-left',
      'animate-slide-in-right',
      'animate-fade-in-up'
    ];
    return animations[index % animations.length];
  }

  getCardHoverClass(): string {
    return 'transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2';
  }

  getValueCardAnimation(index: number): { delay: string; class: string } {
    return {
      delay: `${index * 100}ms`,
      class: 'animate-scale-in'
    };
  }
}
