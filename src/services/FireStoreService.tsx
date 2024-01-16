import { setDoc, doc, getDoc, addDoc, collection, getDocs, query, where, updateDoc, Timestamp, deleteDoc } from "firebase/firestore"
import { db } from "../firebase"
import { bracket, user } from "../types"
import { FirebaseError } from "firebase/app"

export const addUserToDatabase = async (firstName: string, lastName: string, email: string, userId: string): Promise<boolean> => {
    try {
        await setDoc(doc(db, "users", userId), {
            id: userId,
            firstName,
            lastName,
            email,
        })
        console.log("User written with ID: ", userId)

        return true
    } catch (error) {
        const firebaseError = error as FirebaseError

        const errorCode = firebaseError.code
        const errorMessage = firebaseError.message

        console.log(errorCode, errorMessage)
        return false
    }
}

export const getOneDoc = async (collection: string, id: string) => {
    try {
        const userDetails = await getDoc(doc(db, collection, id))
        return userDetails.data()


    } catch (error) {
        const firebaseError = error as FirebaseError

        const errorCode = firebaseError.code
        const errorMessage = firebaseError.message

        console.log(errorCode, errorMessage)
    }
}

export const addBracketToDatabase = async (bracket: bracket, user: user, setBracket: (bracket: bracket) => void): Promise<boolean> => {
    try {
        const docRef = doc(collection(db, 'brackets'))

        const today = Timestamp.fromDate(new Date())

        const bracketDB: bracket = {
            id: docRef.id,
            userId: user.id,
            name: bracket.name,
            rounds: bracket.rounds,
            scoringSystem: bracket.scoringSystem,
            size: bracket.size,
            dateCreated: today
        }

        await setDoc(docRef, bracketDB)

        setBracket(bracketDB)

        console.log("Bracket written with ID: ", docRef.id)

        return true
    } catch (error) {
        const firebaseError = error as FirebaseError

        const errorCode = firebaseError.code
        const errorMessage = firebaseError.message

        console.log(errorCode, errorMessage)
        return false
    }
}

export const updateBracketInDatabase = async (bracket: bracket, bracketId: string, user: user, setBracket: (bracket: bracket) => void) => {
    try {
        await updateDoc(doc(db, 'brackets', bracketId), {
            name: bracket.name,
            rounds: bracket.rounds,
            scoringSystem: bracket.scoringSystem,
            size: bracket.size,
        })

        setBracket(bracket)

        console.log("Bracket successfully updated")

        return true
    } catch (error) {
        const firebaseError = error as FirebaseError

        const errorCode = firebaseError.code
        const errorMessage = firebaseError.message

        console.log(errorCode, errorMessage)
        return false
    }
}

export const deleteBracketFromDatabase = async (bracketId: string) => {
    try {
        await deleteDoc(doc(db, "brackets", bracketId))

        console.log("Bracket successfully deleted")

        return true

    } catch (error) {
        const firebaseError = error as FirebaseError

        const errorCode = firebaseError.code
        const errorMessage = firebaseError.message

        console.log(errorCode, errorMessage)
        return false
    }
}

export const getallBracketsByUser = async (user: user, setBrackets: (brackets: bracket[]) => void): Promise<boolean> => {
    console.log('getting brackets')
    try {
        let brackets: bracket[] = []
        const bracketsQuery = await getDocs(query(collection(db, 'brackets'), where('userId', '==', user.id)))

        bracketsQuery.forEach((bracket) => {
            console.log(bracket.id, " => ", bracket.data())
            brackets.push(bracket.data() as bracket)
        })

        setBrackets(brackets)

        return true

    } catch (error) {
        const firebaseError = error as FirebaseError

        const errorCode = firebaseError.code
        const errorMessage = firebaseError.message

        console.log(errorCode, errorMessage)

        return false
    }
}