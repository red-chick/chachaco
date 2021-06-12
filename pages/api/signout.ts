import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuth } from "../../src/firebase/lib";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    firebaseAuth()
      .signOut()
      .then((data) => {
        res.status(200).send("success");
      })
      .catch((error) => {
        res.status(401).send(error);
      });
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
