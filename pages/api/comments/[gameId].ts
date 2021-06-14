import { NextApiRequest, NextApiResponse } from "next";
import { getCollectionWhere } from "../../../src/firebase/utils";

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
        directionStr: "desc",
      }
    );
    res.json(data);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
