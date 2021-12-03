import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Character, CharacterMin } from "../../types/character";
import api from "../../util/api";

const entity = "characters";

//Get specific character with given name
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

        const fullUrl = `${
          api.baseURL
        }${entity}?nameStartsWith=${charName}&orderBy=name&ts=${
          api.timestamp
        }&apikey=${api.public_apiKey}&hash=${api.calcHash()}`;

        const response = await axios.get(fullUrl);

        console.log("response is", response);

        const characters = response.data.data.results.map((item: Character) => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            apiPage: `api/${item.name}`,
          };
        });

        res.status(200).send(characters);
      } catch (error) {
        console.log("error fetching characters", error);
        res.status(500).send(error);
      }

      break;
    case "PUT":
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
