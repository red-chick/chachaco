import { firestore } from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

import { addDoc } from "../../src/firebase/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { gameId, uid, uname, comment } = req.body;

    const data = await addDoc("comments", {
      createdAt: firestore.Timestamp.now(),
      updatedAt: firestore.Timestamp.now(),
      uid,
      uname,
      gameId,
      comment,
    });
    res.json(data);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};