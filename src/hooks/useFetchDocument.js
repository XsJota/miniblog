// imports
import { doc, getDoc } from "firebase/firestore";
import {db} from '../config/db';

// import hooks
import { useEffect, useState } from "react"

export const useFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

     useEffect(() => {
        const loadDocument = async () => {
            if (cancelled) return;
            
            setLoading(true);

            try {
                const docRef = await doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);

                setDocument(docSnap.data());

                setLoading(false);
            } catch (error) {
                console.log(error);

                setError(error.message);
                setLoading(false);
            }
        }

        loadDocument();
      },[docCollection, id, cancelled])

    useEffect(() => {
    () => setCancelled(true)
    },[])

    return {document, loading, error}
}