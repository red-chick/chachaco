import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuth } from "../../src/firebase/lib";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { email, password } = req.query;

    firebaseAuth()
      .signInWithEmailAndPassword(email as string, password as string)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((error) => {
        res.status(401).send(error);
      });
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
