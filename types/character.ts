export interface Character {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: string[];
  thumbnail: {
    extension: string;
    path: string;
  };
  comics: any[];
  stories: any[];
  events: any[];
  series: any[];
}

export interface CharacterMin {
  id: number;
  name: string;
  description: string;
  image: string;
  apiPage: string;
}
