import type { AboutPageData, AboutSection, TeamStats, CompanyValues } from '../domain/entities/About';

export class AboutDataService {
  createAboutPageData(hero: any, sections: any[]): AboutPageData {
    return {
      hero,
      sections: this.enhanceSections(sections)
    };
  }

  private enhanceSections(sections: any[]): AboutSection[] {
    return sections.map((section, index) => ({
      ...section,
      icon: this.getSectionIcon(index),
      highlight: this.shouldHighlight(index)
    }));
  }

  private getSectionIcon(index: number): string {
    const icons = [
      '🌟', // Our Origin Story
      '💎', // What Makes Us Different
      '🎯', // Our Mission & Values
      '👥', // Our Expert Team
      '🏆', // Professional Excellence
      '❤️'  // Client Experience
    ];
    return icons[index] || '✨';
  }

  private shouldHighlight(index: number): boolean {
    // Highlight mission & values section
    return index === 2;
  }

  getTeamStats(): TeamStats {
    return {
      yearsExperience: '3+',
      happyClients: '500+',
      teammembers: '10+',
      certifications: '5+'
    };
  }

  getCompanyValues(): CompanyValues[] {
    return [
      {
        title: 'Respect',
        description: 'We honor every home as a sacred space',
        icon: '🙏'
      },
      {
        title: 'Excellence',
        description: 'Professional standards in every detail',
        icon: '⭐'
      },
      {
        title: 'Transformation',
        description: 'Creating peace through cleaning',
        icon: '🦋'
      },
      {
        title: 'Connection',
        description: 'Building lasting relationships',
        icon: '🤝'
      },
      {
        title: 'Integrity',
        description: 'Honest and transparent service',
        icon: '💎'
      },
      {
        title: 'Presence',
        description: 'Mindful attention to your needs',
        icon: '🧘'
      }
    ];
  }

  getSectionsByCategory(sections: AboutSection[]): {
    story: AboutSection[];
    values: AboutSection[];
    team: AboutSection[];
  } {
    return {
      story: sections.slice(0, 1),
      values: sections.slice(1, 3),
      team: sections.slice(3)
    };
  }
}
