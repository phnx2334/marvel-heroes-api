import CryptoJS from "crypto-js";

const currentDate = new Date();
const timestamp = currentDate.getTime();
const baseURL = "https://gateway.marvel.com/v1/public/";
const public_apiKey = process.env.PUBLIC_API_KEY;
const private_apiKey = process.env.PRIVATE_API_KEY;

const calcHash = () => {
  return CryptoJS.MD5(`${timestamp}${private_apiKey}${public_apiKey}`);
};

const apiData = {
  baseURL,
  public_apiKey,
  private_apiKey,
  timestamp,
  calcHash,
};

export default apiData;
