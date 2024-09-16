import { addDoc, collection } from "firebase/firestore";
import { db } from "../../configs/firebaseSetup";
import _ from "lodash";

async function addDocument(collectionName: string, data: object) {
  const newData = _.omitBy(data, _.isNil);
  const docRef = await addDoc(collection(db, collectionName), newData);
  return docRef;
}

export { addDocument };
