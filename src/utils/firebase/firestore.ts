import {
  addDoc,
  collection,
  getDocs,
  query,
  QueryFieldFilterConstraint,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../configs/firebaseSetup";
import _ from "lodash";

async function addDocument<T>(collectionName: string, data: Partial<T>) {
  const newData = _.omitBy(
    {
      ...data,
      createdAt: serverTimestamp(),
    },
    _.isNil
  );
  const docRef = await addDoc(collection(db, collectionName), newData);
  return docRef;
}

async function queryDocuments<T>(
  collectionName: string,
  conditions: QueryFieldFilterConstraint[],
  pathSegments: string[] = []
) {
  const q = query(
    collection(db, collectionName, ...pathSegments),
    ...conditions
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as T;
  });
}

export { addDocument, queryDocuments };
