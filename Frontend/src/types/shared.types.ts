export interface Skill {
  id: number;
  name: string;
  icon: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}