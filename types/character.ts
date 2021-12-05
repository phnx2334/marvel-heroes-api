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
  resource: string;
}

export interface characterFull {
  id: number;
  name: string;
  description: string;
  image: string;
  comics: ComicSeries[];
  series: ComicSeries[];
}

export interface ComicSeries {
  title: string;
  urls: {
    type: string;
    url: string;
  }[];
  image: string;
  [key: string]: any;
}
