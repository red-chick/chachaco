import { NextApiRequest, NextApiResponse } from "next";
import { getCollectionWhere } from "../../../src/firebase/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { gid } = req.query;
  if (req.method === "GET") {
    const data = await getCollectionWhere("games", {
      fieldPath: "gid",
      opStr: "==",
      value: gid,
    });
    res.json(data[0]);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
