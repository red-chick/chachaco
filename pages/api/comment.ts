import { firestore } from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

import { addDoc, deleteDoc } from "../../src/firebase/utils";

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
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const data = await deleteDoc("comments", id as string);
    res.status(200).json(data);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
