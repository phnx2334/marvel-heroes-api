export interface CharacterFull {
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
  thumbnail: {
    extension: string;
    path: string;
  };
}

export interface CharacterMinImg {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface CharacterSinglePage {
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

export interface MediaCharacter {
  characters: {
    available: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];
    returned: number;
  };
  [key: string]: any;
}
