// imports hooks
import { useEffect, useState, useReducer } from "react";

//imports
import { db } from "../config/db";
import { doc, deleteDoc } from "firebase/firestore";

// initial state
const initialState = {
    loading: null,
    error: null
}

// reducer
const deleteReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {loading: true, error: null}
        case 'DELETE_DOC':
            return {loading: false, error: null}
        case 'ERROR':
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

// custom hook
export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)
    const checkBeforeDispatch = (action) => {

        if (!cancelled) {
            dispatch(action)
        }

    }

    const deleteDocument = async (id) => {
        checkBeforeDispatch({
            type: 'LOADING'
        })

        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))

            checkBeforeDispatch({
                type: 'DELETE_DOC',
                payload: deletedDocument
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
        deleteDocument,
        response
    }
}
