import React, { useContext } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from '../config/firebase';

import { useAuthState } from 'react-firebase-hooks/auth'

firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();


const FirebaseContext = React.createContext();


export function useFirebase() {

    return useContext(FirebaseContext);
}


function FirebaseProvider(props) {


    const [user, loading, error] = useAuthState(auth);

    return <FirebaseContext.Provider value={{
        auth,
        firestore,
        storage,
        user,
        loading,
        error
    }}>
        {props.children}
    </FirebaseContext.Provider>

}

export default FirebaseProvider;