import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Character } from "../../types/character";
import api from "../../util/api";

//Get specific character with given name
export default async function charactersListHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const entity = "characters";
  const {
    query: { text },
    method,
  } = req;

  if (method === "GET") {
    try {
      const charName = text;

      const fullUrl = `${
        api.baseURL
      }${entity}?nameStartsWith=${charName}&orderBy=name&ts=${api.ts}&apikey=${
        api.public_apiKey
      }&hash=${api.calcHash()}`;

      const response = await axios.get(fullUrl);

      if (response.data.data.results.length) {
        const characters = response.data.data.results.map((item: Character) => {
          return {
            id: item.id,
            name: item.name.trim(),
            description: item.description.trim(),
            image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            apiPage: `api/${item.name}`,
            resource: item.resourceURI,
          };
        });

        res.status(200).send(characters);
      } else {
        res.status(404).send("Hero not found");
      }
    } catch (error) {
      console.log("error fetching characters", error);
      res.status(500).send(error);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
