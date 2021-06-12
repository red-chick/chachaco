import firebase from "./lib";

type Where = {
  fieldPath: string | FirebaseFirestore.FieldPath;
  opStr: FirebaseFirestore.WhereFilterOp;
  value: any;
};

export const getCollection = async (collection: string, where?: Where) => {
  const ref = firebase.collection(collection);
  const snapshot = where
    ? await ref.where(where.fieldPath, where.opStr, where.value).get()
    : await ref.get();

  if (snapshot.empty) return;

  const data = [];

  snapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return data;
};
