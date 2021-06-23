import { NextApiRequest, NextApiResponse } from "next";
import { getCollectionWhere } from "../../../src/api/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { gameId } = req.query;
  if (req.method === "GET") {
    const data = await getCollectionWhere(
      "comments",
      {
        fieldPath: "gameId",
        opStr: "==",
        value: gameId,
      },
      {
        fieldPath: "createdAt",
        directionStr: "asc",
      }
    );
    res.json(data || []);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
