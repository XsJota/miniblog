// imports hooks
import { useEffect, useState, useReducer } from "react";

//imports
import { db } from "../config/db";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// initial state
const initialState = {
    loading: null,
    error: null
}

// reducer
const insertReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {loading: true, error: null}
        case 'INSERTED_DOC':
            return {loading: false, error: null}
        case 'ERROR':
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

// custom hook
export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)
    const checkBeforeDispatch = (action) => {

        if (!cancelled) {
            dispatch(action)
        }

    }

    const insertDocument = async (document) => {
        checkBeforeDispatch({
            type: 'LOADING'
        })

        try {
            const newDocument = {...document, createdAt: Timestamp.now()};
            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )
            checkBeforeDispatch({
                type: 'INSERTED_DOC',
                payload: insertedDocument
            })
        } catch (error) {
            checkBeforeDispatch({
                type: 'ERROR',
                payload: error.message
            })
        }
    }

    useEffect(() => {
        () => setCancelled(true)
    },[])
    
    return {
        insertDocument,
        response
    }
}
