import { useEffect, useState } from 'react';
import initializeAuthentication from './../Pages/Login/Firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, updateProfile ,getIdToken} from "firebase/auth";
initializeAuthentication()
const useFirebase = () => {
    const auth = getAuth();

    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [admin, setAdmin] = useState(false)
    const [token,setToken]= useState('')
    const googleProvider = new GoogleAuthProvider()
    const googleSignin = (location, history) => {
        setLoading(true)
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT')
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
    const registerUser = (email, password, name, history) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError('')
                const newUser = { email, displayName: name }
                setUser(newUser)
                // save user in databse 
                saveUser(email, name, 'POST')
                // send name to firebase after create 
                updateProfile(auth.currentUser, {
                    displayName: name
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
                getIdToken(user)
                .then(idToken=>{
                    setToken(idToken)
                })
            } else {
                setUser({})
            }
            setLoading(false)
        });
        return unsubscribed

    }, [])
    useEffect(() => {
        fetch(`http://localhost:5000/users/${user.email}`)
        .then(res=>res.json())
        .then(data=>{
            setAdmin(data.admin)
        })

    }, [user.email])
    const logOut = () => {
        setLoading(true)
        signOut(auth).then(() => {
        }).catch((error) => {
        })
            .finally(() => {
                setLoading(false)
            });

    }
    // server e data rakhar jonno
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName }
        fetch('http://localhost:5000/users', {
            method: method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)

        })
    }
    return {
        user,admin, token,registerUser, logOut, loginUser, isLoading, error, googleSignin
    }

}
export default useFirebase