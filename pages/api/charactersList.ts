import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Character,
  MediaCharacter,
} from "../../types/character";
import buildUrl, { filters } from "../../util/api";

//Get specific character with given name
export default async function charactersListHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { text, filter },
    method,
  } = req;

  if (method === "GET") {
    try {
      const url = buildUrl(filter as filters, text as string);

      //Get initial data
      const response = await axios.get(url);

      if (filter === "characters") {
        if (response.data.data.results.length) {
          const characters = response.data.data.results.map(
            (item: Character) => {
              return {
                id: item.id,
                name: item.name.trim(),
                description: item.description.trim(),
                image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
                apiPage: `api/${item.name}`,
                resource: item.resourceURI,
              };
            }
          );

          res.status(200).send(characters);
        } else {
          res.status(404).send("Hero not found");
        }
      } else {
        filterWithCharacters(response.data.data.results, (characters: any) => {
          res.status(200).send(characters);
        });
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

const filterWithCharacters = (data: MediaCharacter[], callback: any) => {
  const characters: any = [];
  const addedItems: any[] = [];
  //Get characters
  data.map((item: any) => {
    if (item.characters.returned > 0) {
      const items = item.characters.items;

      items.map((item: any) => {
        const uriArr = item.resourceURI.split("/");
        const id = uriArr[uriArr.length - 1];
        const name = item.name;

        if (!addedItems.includes(id)) {
          characters.push({
            id: id,
            name: name,
          });
          addedItems.push(id);
        }
      });
    }
  });

  //For each character push a request to be made to the array
  const requests: any = [];

  characters.map((character: any) => {
    const characterUrl = buildUrl("character", character.id);
    const charReq = axios.get(characterUrl);
    requests.push(charReq);
  });

  //Make all requests at once
  let results: any = [];
  axios
    .all(requests)
    .then(
      (results = axios.spread((...responses) => {
        //For each response
        const responseData = responses.map((response: any) => {
          const { id, name, description, thumbnail } =
            response.data.data.results[0];

          const imgNotAvailable =
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

          const characterData = {
            id: id,
            name: name.trim(),
            description: description.trim(),
            image: thumbnail
              ? `${thumbnail.path}.${thumbnail.extension}`
              : imgNotAvailable,
          };

          return characterData;
        });

        callback(responseData);
      }))
    )
    .catch((errors) => {
      console.log("Error fetching filtered character data", errors);
    });
};
