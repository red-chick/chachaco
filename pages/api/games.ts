import { NextApiRequest, NextApiResponse } from "next";

import { getCollection } from "../../src/firebase/utils";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await getCollection("games");
  res.json(data);
};
