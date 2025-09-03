import OurStoryimg from "../../../assets/WEBSITE SYMBOLS/ORIGIN.png";
import whatMakesUsDifImg from "../../../assets/WEBSITE SYMBOLS/Difference.png";
import missionValuesImg from "../../../assets/WEBSITE SYMBOLS/Values.png";
import expertTeamImg from "../../../assets/WEBSITE SYMBOLS/TEAM (2) (1).png";
import proffTeamImg from "../../../assets/WEBSITE SYMBOLS/ClientExperience.png";
import clientExpImg from "../../../assets/office-cleaning.png";
import type { AboutPageData, AboutSection, TeamStats, CompanyValues } from '../domain/entities/About';

// Move icons array outside the class for better performance
const SECTION_ICONS = [
  OurStoryimg, // Our Origin Story
  whatMakesUsDifImg, // What Makes Us Different
  missionValuesImg, // Our Mission & Values
  expertTeamImg, // Our Expert Team
  proffTeamImg, // Professional Excellence
  clientExpImg  // Client Experience
];

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
    return SECTION_ICONS[index] || '✨';
  }

  private shouldHighlight(index: number): boolean {
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
      },
      {
        title: 'Excellence',
        description: 'Professional standards in every detail',
      },
      {
        title: 'Transformation',
        description: 'Creating peace through cleaning',
      },
      {
        title: 'Connection',
        description: 'Building lasting relationships',
      },
      {
        title: 'Integrity',
        description: 'Honest and transparent service',
      },
      {
        title: 'Presence',
        description: 'Mindful attention to your needs',
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