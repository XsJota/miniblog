// imports hooks
import { useEffect, useState, useReducer } from "react";

//imports
import { db } from "../config/db";
import { doc, updateDoc } from "firebase/firestore";

// initial state
const initialState = {
    loading: null,
    error: null
}

// reducer
const updateReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {loading: true, error: null}
        case 'UPDATED_DOC':
            return {loading: false, error: null}
        case 'ERROR':
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

// custom hook
export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, initialState)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)
    const checkBeforeDispatch = (action) => {

        if (!cancelled) {
            dispatch(action)
        }

    }

    const updateDocument = async (id, data) => {
        checkBeforeDispatch({
            type: 'LOADING'
        })

        try {
            const docRef = await doc(db, docCollection, id);
            const updatedDocument = await updateDoc(docRef, data)

            checkBeforeDispatch({
                type: 'UPDATED_DOC',
                payload: updatedDocument
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
        updateDocument,
        response
    }
}
