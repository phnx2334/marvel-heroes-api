import CryptoJS from "crypto-js";

const currentDate = new Date();
const ts = currentDate.getTime();
const baseURL = "https://gateway.marvel.com/v1/public/";
const public_apiKey = process.env.PUBLIC_API_KEY;
const private_apiKey = process.env.PRIVATE_API_KEY;

const calcHash = () => {
  return CryptoJS.MD5(`${ts}${private_apiKey}${public_apiKey}`);
};

export type filters =
  | "character"
  | "character-c"
  | "character-s"
  | "characters"
  | "comics"
  | "series"
  | "stories";

const buildUrl = (filter: filters, value: string) => {
  let url = "";

  switch (filter) {
    case "character":
      url = `${baseURL}characters/${value}?&ts=${ts}&apikey=${public_apiKey}&hash=${calcHash()}`;

      break;
    case "character-c":
      url = `${baseURL}characters/${value}/comics?&ts=${ts}&apikey=${public_apiKey}&hash=${calcHash()}`;

      break;
    case "character-s":
      url = `${baseURL}characters/${value}/series?&ts=${ts}&apikey=${public_apiKey}&hash=${calcHash()}`;
      break;
    case "characters":
      url = `${baseURL}${filter}?nameStartsWith=${value}&orderBy=name&ts=${ts}&apikey=${public_apiKey}&hash=${calcHash()}`;
      break;
    case "comics":
      url = `${baseURL}${filter}?titleStartsWith=${value}&orderBy=title&ts=${ts}&apikey=${public_apiKey}&hash=${calcHash()}`;
      break;
    case "series":
      url = `${baseURL}${filter}?titleStartsWith=${value}&orderBy=title&ts=${ts}&apikey=${public_apiKey}&hash=${calcHash()}`;
      break;
    case "stories":
      url = `${baseURL}${filter}?titleStartsWith=${value}&orderBy=id&ts=${ts}&apikey=${public_apiKey}&hash=${calcHash()}`;
      break;

    default:
      break;
  }

  return url;
};

export default buildUrl;
