import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

import { addArrayDoc } from "../../../src/api/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { id, uid } = req.body;

    const data = await addArrayDoc("games", id, {
      likesUids: admin.firestore.FieldValue.arrayUnion(uid),
      likesCount: admin.firestore.FieldValue.increment(1),
    });

    res.json(data);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
