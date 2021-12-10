import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import buildUrl from "../../util/api";
import { CharacterFull, CharacterSinglePage, ComicSeries } from "../../types/character";

export default async function characterHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { characterId, alterName },
    method,
  } = req;

  switch (method) {
    case "GET":
      const characterUrl = buildUrl("character", characterId as string);
      const comicsUrl = buildUrl("character-c", characterId as string);
      const seriesUrl = buildUrl("character-s", characterId as string);

      const charReq = axios.get(characterUrl);
      const comicsReq = axios.get(comicsUrl);
      const seriesReq = axios.get(seriesUrl);

      axios
        .all([charReq, comicsReq, seriesReq])
        .then(
          axios.spread((...responses) => {
            const charRes: CharacterFull[] = responses[0].data.data.results;
            const comicsRes: ComicSeries[] = responses[1].data.data.results;
            const seriesRes: ComicSeries[] = responses[2].data.data.results;

            /* const storiesRes = responses[3]; */

            if (charRes.length > 0) {
              const { id, name, description, thumbnail } = charRes[0];

              const imgNotAvailable =
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

              const responseData: CharacterSinglePage = {
                id: id,
                name: (alterName as string) || name.trim(),
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
