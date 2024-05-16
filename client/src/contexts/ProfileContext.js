import React, { createContext, useEffect, useMemo, useState } from 'react';

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const localData = localStorage.getItem('profile');
    return localData ? JSON.parse(localData) : { user: {}, userInformation: {} };
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('token', token);
  }, [profile, token]);

  const updateToken = (token) => {
    if (token === null || token === 'null') {
      localStorage.removeItem('token');
    }
    setToken(token);
  };

  const getToken = () => {
    if (token === 'null' || token === null) {
      return null;
    }
    return token;
  };

  const updateProfile = (profile) => {
    setProfile(profile);
  };

  const getProfile = () => {
    return profile;
  };

  const cartContext = useMemo(
    () => ({ getProfile, updateProfile, getToken, updateToken }),
    [getProfile, updateProfile, getToken, updateToken]
  );

  return <ProfileContext.Provider value={cartContext}>{children}</ProfileContext.Provider>;
};

export const ProfileContext = createContext();
