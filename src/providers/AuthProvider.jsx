import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = async (name, photo) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    // Preserve Firebase user instance to keep prototype methods
    setUser(auth.currentUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("CurrentUser-->", currentUser?.email, currentUser?.photoURL);

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          console.log("Fetching profile from API...");

          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userProfile = response.data;
          console.log("User profile from DB:", userProfile);
          console.log("Image from DB:", userProfile?.image);

          setUser(currentUser);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          console.error(
            "Error details:",
            error.response?.data || error.message
          );
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
