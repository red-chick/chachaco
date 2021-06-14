import firebase from "firebase";
import { firestore } from "./admin";

type OrderBy = {
  fieldPath: string | FirebaseFirestore.FieldPath;
  directionStr?: FirebaseFirestore.OrderByDirection;
};

type Where = {
  fieldPath: string | FirebaseFirestore.FieldPath;
  opStr: FirebaseFirestore.WhereFilterOp;
  value: any;
};

export const addDoc = async (collection: string, data: any) => {
  const docRef = await firestore.collection(collection).add(data);
  return docRef;
};

export const updateDoc = async (
  collection: string,
  docId: string,
  data: any
) => {
  const docRef = await firestore.collection(collection).doc(docId).update(data);
  return docRef;
};

export const addArrayDoc = async (
  collection: string,
  docId: string,
  updateData: any
) => {
  const docRef = await firestore
    .collection(collection)
    .doc(docId)
    .update(updateData);
  return docRef;
};

export const deleteDoc = async (collection: string, docId: string) => {
  const docRef = await firestore.collection(collection).doc(docId).delete();
  return docRef;
};

export const getCollection = async (collection: string, orderBy?: OrderBy) => {
  const ref = firestore.collection(collection);
  const snapshot = orderBy
    ? await ref.orderBy(orderBy.fieldPath, orderBy.directionStr).get()
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

export const getCollectionWhere = async (
  collection: string,
  where: Where,
  orderBy?: OrderBy
) => {
  const ref = firestore.collection(collection);
  const snapshot = orderBy
    ? await ref
        .where(where.fieldPath, where.opStr, where.value)
        .orderBy(orderBy.fieldPath, orderBy.directionStr)
        .get()
    : await ref.where(where.fieldPath, where.opStr, where.value).get();

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
