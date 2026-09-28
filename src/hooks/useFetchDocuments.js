// hooks imports
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';

// db import
import { db } from '../config/db';

// custom hook to fetch documents from a collection
export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        
        if (cancelled) return;

        setLoading(true);
        setError(null);

        const collectionRef = collection(db, docCollection);

        let q;

        if (search) {
            q = query(
                collectionRef,
                where('tagsArray', 'array-contains', search),
                orderBy('createdAt', 'desc')
            );
        } else if (uid) {
            q = query(
                collectionRef,
                where('uid', '==', uid),
                orderBy('createdAt', 'desc')
            );
        } else {
            q = query(
                collectionRef,
                orderBy('createdAt', 'desc')
            );
        }

        onSnapshot(
            q,

            // success
            (querySnapshot) => {
                const documents = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setDocuments(documents);
                setLoading(false);
            },

            // error
            (error) => {
                console.error('Erro ao buscar documentos:', error);

                setError(error.message);
                setLoading(false);
            }
        );

        // cleanup
        return () => {
            setCancelled(true);
        };

    }, [docCollection, search, uid, cancelled]);

    return {
        documents,
        loading,
        error
    };
};