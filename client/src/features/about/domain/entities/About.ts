export interface AboutIntro {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface AboutStory {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  text: string;
  imageAlt: string;
}

export interface AboutPillar {
  title: string;
  text: string;
}

export interface AboutSection {
  title: string;
  paragraphs: string[];
}

export interface AboutPageData {
  intro: AboutIntro;
  story: AboutStory;
  pillars: AboutPillar[];
  sections: AboutSection[];
}
