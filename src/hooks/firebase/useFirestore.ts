/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { db } from "../../configs/firebaseSetup";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  WhereFilterOp,
} from "firebase/firestore";

export interface QueryCondition {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: any;
}

function useFirestore<T>(
  collectionName: string,
  conditions: QueryFieldFilterConstraint[],
  pathSegments: Array<string> = [],
  forceReturnEmpty: boolean = false
) {
  const [documents, setDocuments] = useState<T[]>([]);

  useEffect(() => {
    if (forceReturnEmpty) {
      setDocuments([]);
      return;
    }
    const q = query(
      collection(db, collectionName, ...pathSegments),
      ...conditions,
      orderBy("createdAt")
    );
    const unsubscrible = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        } as T;
      });

      setDocuments(documents);
    });
    return unsubscrible;
  }, [collectionName, conditions]);

  return documents;
}

export default useFirestore;
