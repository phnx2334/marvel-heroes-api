import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import buildUrl from "../../util/api";

export default async function favoritesCharactersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { charactersId },
    method,
  } = req;

  let idArray: string[] = [];

  if (typeof charactersId === "string" && charactersId.length > 0) {
    idArray = charactersId.split(",");
  } else {
    res.status(404).send(`No favorites found`);
  }

  if (method === "GET") {
    //For each character push a request to be made to the array
    const requests: Promise<AxiosResponse<any, any>>[] = [];

    idArray.map((characterId: string) => {
      const characterUrl = buildUrl("character", characterId);
      const charReq = axios.get(characterUrl);
      requests.push(charReq);
    });

    //Make all requests at once
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
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

          res.status(200).send(responseData);
        })
      )
      .catch((errors) => {
        console.log("Error fetching filtered character data", errors);
      });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
