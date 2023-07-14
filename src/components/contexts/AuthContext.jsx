import { createContext, useContext, useEffect, useState } from 'react';
import { addUserUid, adminUser, checkUserUid, login, logout, onUserStateChanged } from '../../api/firebase';
const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const [authState, setAuthState] = useState({user:null,loading:true});
    const user = authState.user;
    const loading = authState.loading;


    useEffect(()=>{
        onUserStateChanged((user)=>{
            if(user) {
                adminUser(user)
                .then((user)=>{
                    setAuthState({user:user,loading:false});
                    checkUserUid(user.uid)
                    .then((res)=>{
                        if(!res) {
                            addUserUid(user.uid);
                        }
                    });
                })

            } else {
                setAuthState({user:null,loading:false})
            }
        });
    },[])



    return <AuthContext.Provider value={{loading, user, login: login, logout:logout}}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext);
}