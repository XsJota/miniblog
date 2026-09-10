// import firebase config
import {db} from '../config/db';

// imports firebase/auth
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

//import hooks
import { useEffect, useState } from "react";

// custom hook
export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);
    const auth = getAuth();

    const checkIsCancelled = () => {
        if (cancelled) {
            return
        }
    }

    // register
    const createUser = async (data) => {
        checkIsCancelled();
        setLoading(true);
        setError(null)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false);
            return user;
        } catch (error) {
            console.log(error.message);
            console.log(typeof error);
            let errorMessage

            switch (error.code) {
                case 'auth/weak-password':
                    errorMessage = " A senha deve conter no mínimo 6 caracteres!";
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = 'E-mail já cadastrado!';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'E-mail inválido!';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Operção não permitida!';
                    break;
                default:
                    errorMessage = 'Ocorreu um erro, tente novamente mais tarde!';
                    break;
            }
            setError(errorMessage);
            setLoading(null);
        }
    }

    // logout
    const logout = () => {
        checkIsCancelled();
        signOut(auth);
    }

    // login
    const login = async (data) => {
        checkIsCancelled();
        setLoading(true);
        setError(null);

         try {

            await signInWithEmailAndPassword(auth, data.email, data.password);

         } catch (error) {
            console.log(error.code);
            let errorMessage

            switch (error.code) {
                case 'auth/wrong-password':
                    errorMessage = "senha incorreta!";
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Usuário não encontrado!';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'E-mail inválido!';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Operção não permitida!';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'Credencial inválida!';
                    break;
                default:
                    errorMessage = 'Ocorreu um erro, tente novamente mais tarde!';
                    break;
            }

            setLoading(false);
            setError(errorMessage);
         }
    }

    useEffect(() => {
       return setCancelled(true);
    }, []);
    
    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}