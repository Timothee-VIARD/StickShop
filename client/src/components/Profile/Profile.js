import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AutoWidthTextField } from '../Global/AutoWidthTextField';
import { DropZoneComponent } from '../Global/DropZoneComponent';
import { ProfileContext } from '../../contexts/ProfileContext';

export const Profile = () => {
  const { t } = useTranslation();
  const { getProfile, updateProfile } = useContext(ProfileContext);
  const [isNewProfile, setIsNewProfile] = useState();
  const [newUserData, setNewUserData] = useState();
  const [newUser, setNewUser] = useState();
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (getProfile().userInformation.id) {
      setNewUserData(getProfile().userInformation);
      setNewUser(getProfile().user);
      return;
    }
    fetch(`http://localhost:3001/profile/${getProfile().user.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setIsNewProfile(true);
          setNewUserData({ userId: getProfile().user.id });
          setNewUser(getProfile().user);
          updateProfile({ user: getProfile().user, userInformation: { userId: getProfile().user.id } });
          return;
        }
        updateProfile({ user: getProfile().user, userInformation: data });
        setNewUserData(data);
        setNewUser(getProfile().user);
        setIsNewProfile(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du profile', error);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setNewUserData(getProfile().userInformation);
    setNewUser(getProfile().user);
  };

  const handleFileReady = (file) => {
    setFile(file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const isValid = value !== '';

    if (name === 'username' || name === 'email') {
      setNewUser({
        ...newUser,
        [name]: isValid ? value : ''
      });
    } else {
      setNewUserData({
        ...newUserData,
        [name]: isValid ? value : ''
      });
    }

    if (isError) {
      setIsError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isNewProfile);

    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    if (!isNewProfile) {
      formData.append('user', JSON.stringify(newUser));
    }
    formData.append('profile', JSON.stringify(newUserData));

    if (isNewProfile) {
      try {
        const response = await fetch('http://localhost:3001/profile/create', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        } else {
          const data = await response.json();
          setNewUser({ ...newUser, profilePhoto: data.imageUrl });
          setNewUserData({ ...newUserData, image: data.imageUrl });
          updateProfile({
            user: { ...newUser, profilePhoto: data.imageUrl },
            userInformation: { ...newUserData, image: data.imageUrl }
          });
          setIsEditing(false);
        }
      } catch (error) {
        const errorMessage = t(`error.${error.message}`);
        setIsError(true);
        enqueueSnackbar(errorMessage, {
          variant: 'error',
          action: (key) => (
            <IconButton size="small" color="secondary" onClick={() => closeSnackbar(key)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          )
        });
      }
    } else {
      try {
        const response = await fetch('http://localhost:3001/profile/update', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        } else {
          const data = await response.json();
          if (data.imageUrl) {
            setNewUser({ ...newUser, profilePhoto: data.imageUrl });
            setNewUserData({ ...newUserData, image: data.imageUrl });
            updateProfile({
              user: { ...newUser, profilePhoto: data.imageUrl },
              userInformation: { ...newUserData, image: data.imageUrl }
            });
          } else {
            updateProfile({ user: newUser, userInformation: newUserData });
          }
          setIsEditing(false);
        }
      } catch (error) {
        const errorMessage = t(`error.${error.message}`);
        setIsError(true);
        enqueueSnackbar(errorMessage, {
          variant: 'error',
          action: (key) => (
            <IconButton size="small" color="secondary" onClick={() => closeSnackbar(key)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          )
        });
      }
    }
  };

  const DisplayImg = () => {
    return newUserData?.image ? (
      <img src={newUserData?.image} alt={t('profile.photo')} className="rounded-2xl bord sm:w-11/12 xl:w-5/6" />
    ) : (
      <img
        src="http://localhost:3001/images/userProfileEmpty.png"
        alt="avatar"
        className="rounded-2xl bord sm:w-11/12 xl:w-5/6"
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" className="flex justify-center items-center pb-10">
        <Typography variant="h4" className="pt-14 pb-10 flex-grow text-center">
          {t('profile.title')}
        </Typography>
        <Box className="sm:w-11/12 lg:w-2/3 rounded-2xl bg-black bg-opacity-5">
          <Stack direction="row">
            <Stack
              direction="column"
              spacing={4}
              className="w-1/3 justify-center items-center p-6 rounded-l-2xl bg-main bg-opacity-70"
            >
              {isEditing ? (
                <Box className="sm:w-11/12 xl:w-5/6">
                  <DropZoneComponent
                    image={
                      newUserData?.image ? newUserData?.image : 'http://localhost:3001/images/userProfileEmpty.png'
                    }
                    onFileReady={handleFileReady}
                  />
                </Box>
              ) : (
                <DisplayImg />
              )}

              <Stack direction="column" className="items-center">
                {isEditing && !isNewProfile ? (
                  <AutoWidthTextField
                    name="username"
                    variant="standard"
                    value={newUser?.username || ''}
                    onChange={handleInputChange}
                    error={isError}
                    inputProps={{ style: { textAlign: 'center', fontSize: '1.35rem', fontWeight: 'bold' } }}
                    fontSize="1.4rem"
                  />
                ) : (
                  <Typography variant="h5" className="font-bold">
                    {newUser?.username}
                  </Typography>
                )}
                <Typography variant="h6">{t(`auth.roles.${newUser?.role}`)}</Typography>
              </Stack>
            </Stack>
            <Stack direction="column" gap={4} className="w-2/3 p-6">
              <Stack direction="column" gap={2}>
                <Stack direction="column">
                  <Typography variant="h6" className="font-bold">
                    {t('profile.info')}
                  </Typography>
                  <Divider className="border-[1px]" />
                </Stack>
                <Grid container rowGap={2} columnSpacing={2}>
                  <Grid item xs={12} sm>
                    <Stack direction="column">
                      <Typography variant="h6" className="font-bold">
                        {t('profile.firstName')}
                      </Typography>
                      {isEditing ? (
                        <TextField
                          name="firstName"
                          variant="standard"
                          value={newUserData?.firstName || ''}
                          onChange={handleInputChange}
                          error={isError}
                        />
                      ) : (
                        <Typography variant="h6">{newUserData?.firstName}</Typography>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm>
                    <Stack direction="column">
                      <Typography variant="h6" className="font-bold">
                        {t('profile.lastName')}
                      </Typography>
                      {isEditing ? (
                        <TextField
                          name="lastName"
                          variant="standard"
                          value={newUserData?.lastName || ''}
                          onChange={handleInputChange}
                          error={isError}
                        />
                      ) : (
                        <Typography variant="h6">{newUserData?.lastName}</Typography>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="column">
                      <Typography variant="h6" className="font-bold">
                        {t('profile.address')}
                      </Typography>
                      {isEditing ? (
                        <TextField
                          name="address"
                          variant="standard"
                          value={newUserData?.address || ''}
                          onChange={handleInputChange}
                          error={isError}
                        />
                      ) : (
                        <Typography variant="h6">{newUserData?.address}</Typography>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
              <Stack direction="column" gap={2}>
                <Stack direction="column">
                  <Typography variant="h6" className="font-bold">
                    {t('profile.contact')}
                  </Typography>
                  <Divider className="border-[1px]" />
                </Stack>
                <Grid container rowGap={2} columnSpacing={2}>
                  <Grid item xs={12} sm>
                    <Stack direction="column">
                      <Typography variant="h6" className="font-bold">
                        {t('profile.phone')}
                      </Typography>
                      {isEditing ? (
                        <TextField
                          name="phone"
                          variant="standard"
                          value={newUserData?.phone || ''}
                          onChange={handleInputChange}
                          error={isError}
                        />
                      ) : (
                        <Typography variant="h6">{newUserData?.phone}</Typography>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm>
                    <Stack direction="column">
                      <Typography variant="h6" className="font-bold">
                        {t('profile.email')}
                      </Typography>
                      {isEditing && !isNewProfile ? (
                        <TextField
                          name="email"
                          variant="standard"
                          value={newUser?.email || ''}
                          onChange={handleInputChange}
                          error={isError}
                        />
                      ) : (
                        <Typography variant="h6">{newUser?.email}</Typography>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
              {isEditing ? (
                <Stack direction="row" spacing={2} className="flex-grow">
                  <Button variant="contained" color="error" className="w-1/2" onClick={handleEdit}>
                    {t('profile.cancel')}
                  </Button>
                  <Button variant="contained" color="success" className="w-1/2" type="submit">
                    {t('profile.save')}
                  </Button>
                </Stack>
              ) : (
                <Button variant="contained" onClick={handleEdit}>
                  {t('profile.edit')}
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};
