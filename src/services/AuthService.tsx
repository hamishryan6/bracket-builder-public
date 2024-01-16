import { User, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { app } from "../firebase"
import { addUserToDatabase, getOneDoc } from "./FireStoreService"
import { FirebaseError } from "firebase/app"
import { user } from "../types"

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

export const getUserDetails = (): user | undefined => {
    const userDetailsJSON = sessionStorage.getItem('user')
    if (userDetailsJSON === null) return undefined
    return JSON.parse(userDetailsJSON)
  }

export const signUp = async (firstName: string, lastName: string, email: string, password: string, setUser: (user: user | undefined) => void): Promise<user | undefined> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const result = await addUserToDatabase(firstName, lastName, email, userCredential.user.uid)
        const userDetails = await getOneDoc('users', userCredential.user.uid)
    if (userDetails === undefined) throw Error('Error getting user details')
        sessionStorage.setItem('user', JSON.stringify(userDetails))
        setUser(getUserDetails())

        return userDetails as user

    } catch (error) {
        const firebaseError = error as FirebaseError

        const errorCode = firebaseError.code
        const errorMessage = firebaseError.message

        console.log(errorCode, errorMessage)
    }
}

export const logIn = async (email: string, password: string, setUser: (user: user | undefined) => void): Promise<user | undefined> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        const userDetails = await getOneDoc('users', userCredential.user.uid)
        if (userDetails === undefined) throw Error('Error getting user details')
        sessionStorage.setItem('user', JSON.stringify(userDetails))
        setUser(getUserDetails())
        console.log('user logging in')

        return userDetails as user

    } catch (error) {
        const firebaseError = error as FirebaseError

        const errorCode = firebaseError.code
        const errorMessage = firebaseError.message

        console.log(errorCode, errorMessage)
    }
}

export const signOutUser = async (setUser: (user: user | undefined) => void) => {
    try {
        await signOut(auth)
        sessionStorage.removeItem('user')
        setUser(getUserDetails())

        return true
    } catch (error) {
        console.log(error)

        return false
    }
}