import { NextApiRequest, NextApiResponse } from "next";

import { getCollection } from "../../src/firebase/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const data = await getCollection("games", {
        fieldPath: "createdAt",
        directionStr: "desc",
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
