import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
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

        console.log("the text is", text);

        const fullUrl = `${
          api.baseURL
        }${entity}?nameStartsWith=${charName}&orderBy=name&ts=${
          api.timestamp
        }&apikey=${api.public_apiKey}&hash=${api.calcHash()}`;

        const response = await axios.get(fullUrl);

        console.log("the response data is", response);

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
