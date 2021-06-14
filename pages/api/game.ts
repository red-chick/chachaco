import { NextApiRequest, NextApiResponse } from "next";
import { addDoc, getCollectionWhere } from "../../src/firebase/utils";
import { firestore } from "firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { title, gid, pid, content, imageUrls, uid, uname, maker, source } =
      req.body;

    const games = await getCollectionWhere("games", {
      fieldPath: "gid",
      opStr: "==",
      value: gid,
    });

    if (games) {
      res.status(409).send("gid already exists.");
      return;
    }

    const data = await addDoc("games", {
      createdAt: firestore.Timestamp.now(),
      updatedAt: firestore.Timestamp.now(),
      uid,
      uname,
      title,
      gid,
      pid,
      content,
      imageUrls,
      likesUids: [],
      likesCount: 0,
      maker,
      source,
    });

    res.status(200).json(data);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
