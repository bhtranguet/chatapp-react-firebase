/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { db } from "../../configs/firebaseSetup";
import { collection, query, where, WhereFilterOp } from "firebase/firestore";

export interface QueryCondition {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: any;
}

function useFirestore(collectionName: string, condition: QueryCondition) {
  const [documents, setDocuments] = useState<object[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      where(condition.fieldName, condition.operator, condition.compareValue)
    );
  }, [collectionName, condition]);
}

export default useFirestore;
