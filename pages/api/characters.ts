import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Character } from "../../types/character";
import CryptoJS from "crypto-js";

const currentDate = new Date();
const timestamp = currentDate.getTime();
const baseURL = "https://gateway.marvel.com/v1/public/";
const entity = "characters";

const public_apiKey = process.env.PUBLIC_API_KEY;
const private_apiKey = process.env.PRIVATE_API_KEY;
const hash = CryptoJS.MD5(`${timestamp}${private_apiKey}${public_apiKey}`);

//Get specific character with name
export default async function charactersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { text },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const charName = text;
        const response = await axios.get(
          `${baseURL}${entity}?nameStartsWith=${charName}&orderBy=name&ts=${timestamp}&apikey=${public_apiKey}&hash=${hash}`
        );

        res.status(200).send(response.data);
      } catch (error) {
        console.log("error fetching characters", error);
      }

      break;
    case "PUT":
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
