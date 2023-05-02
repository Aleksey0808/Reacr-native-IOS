import db from '../../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  import {authSlice} from './authReducer'

const auth = getAuth(db);
// console.log(auth.currentUser.uid)
const authSingUpUser = ({name, password, mail}) => async (dispatch, getState) => {
    try {
        await createUserWithEmailAndPassword(auth, mail, password);

        const user = await auth.currentUser;
        console.log(user)
        const { displayName, uid } = await auth.currentUser;

        await updateProfile(user, {
            displayName: name,
          });

        dispatch(authSlice.actions.updateUserProfile({
            userId: uid,
            name: name,
        }))
      } catch (error) {
        console.log("error.message", error.message);
      }
}
const authSingInUser = ({password, mail}) => async (dispatch, getState) => {
    try {
        await signInWithEmailAndPassword(auth, mail, password);

      } catch (error) {
        console.log("error.message", error.message);
      }
}
const authSingOutUser = () => async (dispatch, getState) => {}
const authStateChangeUser = () => async (dispatch, getState) => {}

export {authSingInUser, authSingUpUser, authSingOutUser, authStateChangeUser}