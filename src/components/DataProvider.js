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
    const profilesCol = firestore.collection('profiles');
    const [profile, loadingProfile] = useDocumentData(profileDoc)
    const [profiles, loadingProfiles] = useCollectionData(profilesCol.orderBy('nama'), { idField: 'id' });

    if (loadingProfiles || loadingProfile) {
        return <AppLoading />
    }

    return <DataContext.Provider value={{
        profiles,
        profile
    }}>
        {props.children}
    </DataContext.Provider>
}