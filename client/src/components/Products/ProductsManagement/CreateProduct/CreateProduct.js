import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DropZoneComponent } from '../../../Global/DropZoneComponent';
import { checkNumbers } from '../../../../utils/global/Numbers';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSnackbar } from 'notistack';
import { Link, useHistory } from 'react-router-dom';

export const CreateProduct = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const isValid = value !== '';

    setProduct({
      ...product,
      [name]: isValid ? value : null
    });

    if (isError) {
      setIsError(false);
    }
  };

  const handleFileReady = (file) => {
    setFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    if (file) {
      data.append('image', file);
    }
    product.name && data.append('name', product.name);
    product.price && data.append('price', product.price);
    product.description && data.append('description', product.description);
    product.category && data.append('category', product.category);
    product.quantity && data.append('quantity', product.quantity);
    product.inStock && data.append('inStock', product.inStock);

    try {
      const response = await fetch('http://localhost:3001/admin/add', {
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      history.push('/admin');
    } catch (error) {
      setIsError(true);
      const errorMessage = t(`error.${error.message}`);
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        action: (key) => (
          <IconButton size="small" color="secondary" onClick={() => closeSnackbar(key)}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        )
      });
    }
  };

  return (
    <main>
      <Typography variant="h4" className="pt-14 pb-10 flex-grow text-center">
        {t('admin.createProduct.title')}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box className="w-full flex justify-center mb-14">
          <Stack direction="column" className="w-9/12" spacing={5}>
            <Stack direction="row" spacing={3}>
              <Box className="w-3/4">
                <DropZoneComponent image={product.image} onFileReady={handleFileReady} />
              </Box>
              <Stack direction="column" spacing={2} className="w-full">
                <Typography variant="h5">{t('admin.createProduct.details')}</Typography>
                <TextField
                  name="name"
                  label={t('admin.createProduct.name')}
                  value={product.name || ''}
                  onChange={handleInputChange}
                  error={isError}
                  helperText={isError && t('admin.createProduct.required')}
                />
                <TextField
                  name="price"
                  label={t('admin.createProduct.price')}
                  value={product.price || ''}
                  onChange={handleInputChange}
                  error={isError}
                  helperText={isError && t('admin.createProduct.required')}
                  onKeyDown={checkNumbers}
                />
                <TextField
                  name="category"
                  label={t('admin.createProduct.category')}
                  value={product.category || ''}
                  onChange={handleInputChange}
                />
                <TextField
                  name="quantity"
                  label={t('admin.createProduct.quantity')}
                  value={product.quantity || ''}
                  onChange={handleInputChange}
                  error={isError}
                  helperText={isError && t('admin.createProduct.required')}
                  onKeyDown={checkNumbers}
                />
                <TextField
                  name="inStock"
                  label={t('admin.createProduct.inStock')}
                  value={product.inStock || ''}
                  onChange={handleInputChange}
                  error={isError}
                  helperText={isError && t('admin.createProduct.required')}
                  onKeyDown={checkNumbers}
                />
              </Stack>
            </Stack>

            <TextField
              name="description"
              label={t('admin.createProduct.description')}
              value={product.description || ''}
              onChange={handleInputChange}
              multiline
            />
            <Box className="flex justify-center">
              <Stack direction="row" spacing={2}>
                <Button type="submit">{t('admin.createProduct.save')}</Button>
                <Button component={Link} to={'/admin'} color="error">
                  {t('admin.createProduct.cancel')}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </form>
    </main>
  );
};
