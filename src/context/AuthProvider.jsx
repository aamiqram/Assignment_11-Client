import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import app, {
  googleProvider,
  facebookProvider,
} from "../firebase/firebase.config";
import axiosSecure from "../utils/axiosSecure";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const createUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Configure Google provider to always ask for account selection
      googleProvider.setCustomParameters({
        prompt: "select_account",
      });

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithFacebook = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const demoEmail =
        import.meta.env.VITE_DEMO_EMAIL || "demo@localchefbazaar.com";
      const demoPassword =
        import.meta.env.VITE_DEMO_PASSWORD || "demopassword123";

      console.log("Attempting demo login with:", demoEmail);
      return await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
    } catch (err) {
      console.error("Demo login error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sync user with MongoDB
  const syncUserToDB = async (currentUser) => {
    if (!currentUser || !currentUser.email) return;

    try {
      const userData = {
        name: currentUser.displayName || "User",
        email: currentUser.email,
        image:
          currentUser.photoURL || "https://i.ibb.co.com/0s3pdnc/avatar.png",
        updatedAt: new Date().toISOString(),
      };

      await axiosSecure.put("/users", userData);
    } catch (err) {
      console.error("User sync failed:", err.message);
      // Don't throw error here, just log it
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("Auth state changed - User logged in:", currentUser.email);
        setUser(currentUser);

        // Sync to MongoDB
        await syncUserToDB(currentUser);

        setLoading(false);
      } else {
        console.log("Auth state changed - No user");
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    error,
    createUser,
    login,
    loginWithGoogle,
    loginWithFacebook,
    demoLogin,
    logout,
    syncUserToDB,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
