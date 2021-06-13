import { NextApiRequest, NextApiResponse } from "next";

import { getCollection } from "../../src/firebase/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const data = await getCollection("games", {
      fieldPath: "createdAt",
      directionStr: "desc",
    });
    res.json(data);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
