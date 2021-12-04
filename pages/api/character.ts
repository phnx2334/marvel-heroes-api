import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import api from "../../util/api";

export default async function characterHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const entity = "characters";
  const {
    query: { characterId },
    method,
  } = req;
  console.log(
    "RESPONSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
  );
  console.log("METHOD", method);

  switch (method) {
    case "GET":
      const fullUrl = `${api.baseURL}${entity}/${characterId}?&ts=${
        api.ts
      }&apikey=${api.public_apiKey}&hash=${api.calcHash()}`;

      const response = await axios.get(fullUrl);

      if (response.data.data.results.length) {
        res.status(200).send(response.data.data.results[0]);
      }else{
        res.status(404).send("Page not found");
      }

      console.log("responsuuuuuuuuuuuuuu", response.data)

      

      break;

    default:
      break;
  }
}
