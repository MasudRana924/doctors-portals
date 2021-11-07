import { useEffect, useState } from 'react';
import initializeAuthentication from './../Pages/Login/Firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider,updateProfile  } from "firebase/auth";
initializeAuthentication()
const useFirebase = () => {
    const auth = getAuth();

    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')
     const googleProvider =new GoogleAuthProvider()
    const googleSignin = (location,history) => {
        setLoading(true)
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                const destination = location?.state?.from || '/'
                history.replace(destination)
                setError('')
                // ...
            }).catch((error) => {
                setError(error.message)  
            })
            .finally(() => {
                setLoading(false)
            })
            ;
    }
    const registerUser = (email, password,name,history) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {              
                setError('')      
                const newUser={email,displayName:name} 
                setUser(newUser)
                updateProfile(auth.currentUser, {
                    displayName:name
                  }).then(() => {
                    
                  }).catch((error) => {
                
                  });
                history.replace('/')      
            })
            .catch((error) => {
                setError(error.message)     
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const loginUser = (email, password, location, history) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {             
                const destination = location?.state?.from || '/'
                history.replace(destination)
                setError('')       
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
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
        }).catch((error) => {   
        })
            .finally(() => {
                setLoading(false)
            });
    }

    return {
        user, registerUser, logOut, loginUser, isLoading, error,googleSignin
    }

}
export default useFirebase