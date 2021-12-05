import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import api from "../../util/api";
import { Character, characterFull, ComicSeries } from "../../types/character";

export default async function characterHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const entity = "characters";
  const {
    query: { characterId },
    method,
  } = req;

  switch (method) {
    case "GET":
      const characterUrl = `${api.baseURL}${entity}/${characterId}?&ts=${
        api.ts
      }&apikey=${api.public_apiKey}&hash=${api.calcHash()}`;
      const comicsUrl = `${api.baseURL}${entity}/${characterId}/comics?&ts=${
        api.ts
      }&apikey=${api.public_apiKey}&hash=${api.calcHash()}`;
      const seriesUrl = `${api.baseURL}${entity}/${characterId}/series?&ts=${
        api.ts
      }&apikey=${api.public_apiKey}&hash=${api.calcHash()}`;
      /* const storiesUrl = `${api.baseURL}${entity}/${characterId}/stories?&ts=${
        api.ts
      }&apikey=${api.public_apiKey}&hash=${api.calcHash()}`; */

      const charReq = axios.get(characterUrl);
      const comicsReq = axios.get(comicsUrl);
      const seriesReq = axios.get(seriesUrl);
      /* const storiesReq = axios.get(storiesUrl); */

      axios
        .all([charReq, comicsReq, seriesReq])
        .then(
          axios.spread((...responses) => {
            const charRes: Character[] = responses[0].data.data.results;
            const comicsRes: ComicSeries[] = responses[1].data.data.results;
            const seriesRes: ComicSeries[] = responses[2].data.data.results;

            /* const storiesRes = responses[3]; */

            if (charRes.length > 0) {
              const { id, name, description, thumbnail } = charRes[0];

              const imgNotAvailable =
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

              const responseData: characterFull = {
                id: id,
                name: name.trim(),
                description: description.trim(),
                image: thumbnail
                  ? `${thumbnail.path}.${thumbnail.extension}`
                  : imgNotAvailable,
                comics: cleanResults(comicsRes),
                series: cleanResults(seriesRes),
              };

              res.status(200).send(responseData);
            } else {
              res.status(404).send("Page not found");
            }
          })
        )
        .catch((errors) => {
          console.log("Error fetching character data", errors);
          res.status(500).send("Error fetching character data");
        });

      break;

    default:
      break;
  }
}

const cleanResults = (items: ComicSeries[]) => {
  if (!(items.length > 0)) return [];

  const cleansed = items.map((item) => {
    return {
      title: item.title.trim(),
      urls: item.urls,
      image: item.thumbnail
        ? `${item.thumbnail.path}.${item.thumbnail.extension}`
        : "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
    };
  });

  return cleansed;
};
