export interface IComic {
  id: number;
  digitalId: number; //Will be 0 if the comic is not available digitally.
  title: string;
  issueNumber: number; //will generally be 0 for collection formats
  variantDescription: string;
  description: string;
  modified: Date;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: any[]; //Array[TextObject]	A set of descriptive text blurbs for the comic.
  resourceURI: string;
  urls: any[]; //Array[Url]	A set of public web site URLs for the resource.
  series: any; //SeriesSummary
  variants: any[]; //Array[ComicSummary]	A list of variant issues for this comic (includes the "original" issue if the current issue is a variant).
  collections: any[]; //Array[ComicSummary]	A list of collections which include this comic (will generally be empty if the comic's format is a collection).
  collectedIssues: any[]; //Array[ComicSummary]	A list of issues collected in this comic (will generally be empty for periodical formats such as "comic" or "magazine").
  dates: any[]; //Array[ComicDate]	A list of key dates for this comic.
  prices: any[]; //Array[ComicPrice]	A list of prices for this comic.
  thumbnail: {
    extension: string;
    path: string;
  };
  images: any[]; //Array[Image]	A list of promotional images associated with this comic.
  creators: any; //ResourceList	A resource list containing the creators associated with this comic.
  characters: any; //ResourceList	A resource list containing the characters which appear in this comic.
  stories: any; //ResourceList	A resource list containing the stories which appear in this comic.
  events: any; //ResourceList	A resource list containing the events in which this comic appears.
}
