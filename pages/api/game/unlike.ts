import { NextApiRequest, NextApiResponse } from "next";
import { addArrayDoc } from "../../../src/firebase/utils";
import admin from "firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id, uid } = req.body;

    console.log("id", id);
    console.log("uid", uid);

    const data = await addArrayDoc("games", id, {
      likesUids: admin.firestore.FieldValue.arrayRemove(uid),
      likesCount: admin.firestore.FieldValue.increment(-1),
    });

    res.json(data);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
