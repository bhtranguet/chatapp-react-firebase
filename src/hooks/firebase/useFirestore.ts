/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { db } from "../../configs/firebaseSetup";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  WhereFilterOp,
} from "firebase/firestore";

export interface QueryCondition {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: any;
}

function useFirestore(collectionName: string, condition: QueryCondition) {
  const [documents, setDocuments] = useState<object[]>([]);

  useEffect(() => {
    if (!condition.compareValue || !condition.compareValue.length) {
      // reset documents data
      setDocuments([]);
      return;
    }
    const q = query(
      collection(db, collectionName),
      where(condition.fieldName, condition.operator, condition.compareValue),
      orderBy("createdAt")
    );
    const unsubscrible = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      setDocuments(documents);
    });
    return unsubscrible;
  }, [collectionName, condition]);

  return documents;
}

export default useFirestore;
