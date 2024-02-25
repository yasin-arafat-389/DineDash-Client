/* eslint-disable react/prop-types */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../Firebase/firebase.config";
import { useDispatch } from "react-redux";
import { userEmail } from "../Redux/CartCountSlice/CartCountSlice";
import { getUserEmail } from "../Redux/MyCartSlice/MyCartSlice";

export const authContext = createContext();

const AuthContext = ({ children }) => {
  const provider = new GoogleAuthProvider();
  let dispatch = useDispatch();

  // Hooks
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  let createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  let login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  let googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  let update = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  let logOut = () => {
    return signOut(auth);
  };

  // Observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        dispatch(userEmail({ email: user.email }));
        dispatch(getUserEmail({ email: user.email }));
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [dispatch]);

  let authInfo = {
    createUser,
    logOut,
    login,
    update,
    googleLogin,
    loading,
    user,
  };

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthContext;
