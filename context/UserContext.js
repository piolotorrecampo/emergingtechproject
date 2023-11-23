import React, { createContext, useContext, useState, useEffect } from 'react';

import { db } from "../services/firebase";
import { getDocs, getDoc, doc, collection } from '@firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [userDataUpdated, setUserDataUpdated] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = collection(db, 'products');
      try {
        const querySnapshot = await getDocs(q);
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
        console.log('UserContext -> Products:', products);
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    };

    const fetchUserData = async (userId) => {
      const userRef = doc(db, 'users', userData.id);
    
      try {
        const userDoc = await getDoc(userRef);
    
        if (userDoc.exists()) {
          const data = { id: userDoc.id, ...userDoc.data() };
          setUserDataUpdated(data);
          console.log('UserContext -> UserDataUpdated:', data);
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error('Error getting user document: ', error);
      }
    };
      
    let timerId = setInterval(() => {
      fetchProducts();
      if(userData){
        fetchUserData();
      }
    }, 2000);

    return () => {
      clearInterval(timerId);
    };
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData, products, userDataUpdated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
