import React, { useContext } from 'react';

import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { firestore, useFirebase } from './FirebaseProvider';
import AppLoading from './AppLoading';
const DataContext = React.createContext();

export function useData() {

    return useContext(DataContext);
}

export default function DataProvider(props) {
    const { user } = useFirebase();
    const profileDoc = firestore.doc(`profiles/${user.uid}`);
    const contactsCol = firestore.collection('profiles');
    const chatsCol = firestore.collection('chats');
    const [profile, loadingProfile] = useDocumentData(profileDoc)
    const [contacts, loadingContacts] = useCollectionData(contactsCol.orderBy('nama'), { idField: 'id' });
    const [chats, loadingChats, error] = useCollectionData(chatsCol.where("user_ids", "array-contains", user.uid).orderBy("updated_at", "desc"), { idField: "id" });
    console.log(chats, error)
    if (loadingContacts || loadingProfile || loadingChats) {
        return <AppLoading />
    }

    return <DataContext.Provider value={{
        contacts,
        profile,
        chats
    }}>
        {props.children}
    </DataContext.Provider>
}