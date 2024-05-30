import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { DropZoneComponent } from '../../Global/DropZoneComponent';
import { checkNumbers } from '../../../utils/global/Numbers';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSnackbar } from 'notistack';

export const ProductEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [file, setFile] = useState(null);
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du produit:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const isValid = value !== '';

    setProduct({
      ...product,
      [name]: isValid ? value : ''
    });
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
    data.append('productId', product.id);
    data.append('name', product.name);
    data.append('price', product.price);
    data.append('description', product.description);
    data.append('category', product.category);
    data.append('quantity', product.quantity);
    data.append('inStock', product.inStock);

    try {
      const response = await fetch('http://localhost:3001/admin/update', {
        method: 'PUT',
        body: data
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du fichier");
      }

      history.push('/admin');
    } catch (error) {
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Typography variant="h4" className="pt-14 pb-10 flex-grow text-center">
            {t('admin.productEdit.title')}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className="w-full flex justify-center mb-14">
              <Stack direction="column" className="w-9/12" spacing={5}>
                <Stack direction="row" spacing={3}>
                  <Box className="w-3/4">
                    <DropZoneComponent image={product.image} onFileReady={handleFileReady} />
                  </Box>
                  <Stack direction="column" spacing={2} className="w-full">
                    <Typography variant="h5">{t('admin.productEdit.edit')}</Typography>
                    <TextField
                      name="name"
                      label={t('admin.productEdit.name')}
                      value={product.name || ''}
                      onChange={handleInputChange}
                      error={product.name === ''}
                      helperText={product.name === '' ? t('admin.productEdit.required') : ''}
                    />
                    <TextField
                      name="price"
                      label={t('admin.productEdit.price')}
                      value={product.price || ''}
                      onChange={handleInputChange}
                      error={product.price === ''}
                      onKeyDown={checkNumbers}
                      helperText={product.price === '' ? t('admin.productEdit.required') : ''}
                    />
                    <TextField
                      name="category"
                      label={t('admin.productEdit.category')}
                      value={product.category || ''}
                      onChange={handleInputChange}
                    />
                    <TextField
                      name="quantity"
                      label={t('admin.productEdit.quantity')}
                      value={product.quantity || ''}
                      onChange={handleInputChange}
                      error={product.quantity === ''}
                      helperText={product.quantity === '' ? t('admin.productEdit.required') : ''}
                      onKeyDown={checkNumbers}
                    />
                    <TextField
                      name="inStock"
                      label={t('admin.productEdit.inStock')}
                      value={product.inStock || ''}
                      onChange={handleInputChange}
                      error={product.inStock === ''}
                      helperText={product.inStock === '' ? t('admin.productEdit.required') : ''}
                      onKeyDown={checkNumbers}
                    />
                  </Stack>
                </Stack>

                <TextField
                  name="description"
                  label={t('admin.productEdit.description')}
                  value={product.description || ''}
                  onChange={handleInputChange}
                  multiline
                />
                <Box className="flex justify-center">
                  <Stack direction="row" spacing={2}>
                    <Button type="submit">{t('admin.productEdit.save')}</Button>
                    <Button component={Link} to={'/admin'} color="error">
                      {t('admin.productEdit.cancel')}
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </form>
        </>
      )}
    </main>
  );
};
