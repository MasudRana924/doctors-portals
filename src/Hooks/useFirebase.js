import { useEffect, useState } from 'react';
import initializeAuthentication from './../Pages/Login/Firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
initializeAuthentication()
const useFirebase = () => {
    const auth = getAuth();

    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error,setError]=useState('')

    const registerUser = (email, password) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                setError('')
                // ...
            })
            .catch((error) => {
           
               setError(error.message)
                // ..
            })
            .finally(() =>{
                setLoading(false)
            })
    }
const loginUser = (email, password) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            setError('')
            // ...
        })
        .catch((error) => {
      
            setError(error.message)
        })
        .finally(() =>{
            setLoading(false)
        })
}
// sob jaigia login/logout set korar jonno observe korbe 
useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)

        } else {
            setUser({})
        }
        setLoading(false)
    });
    return unsubscribed

}, [])
const logOut = () => {
    setLoading(true)
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    })
    .finally(() =>{
        setLoading(false)
    });
}

return {
    user, registerUser, logOut, loginUser,isLoading,error
}

}
export default useFirebase