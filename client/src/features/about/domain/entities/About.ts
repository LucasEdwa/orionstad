export interface AboutIntro {
  eyebrow: string;
  title: string;
  subtitle: string;
}

/** `text` holds paragraphs separated by a blank line */
export interface AboutStory {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  text: string;
  imageAlt: string;
}
