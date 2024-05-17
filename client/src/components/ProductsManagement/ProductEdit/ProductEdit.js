import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DropZoneComponent } from './DropZoneComponent/DropZoneComponent';

export const ProductEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [file, setFile] = useState(null);

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
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du fichier");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier", error);
    }
  };

  const checkNumbers = (event) => {
    const { name, value } = event.target;
    const isNumericKey = /^\d+$/.test(event.key);
    const isControlKey = event.key === 'Control';
    const isDeleteKey = event.key === 'Delete';
    const isBackspaceKey = event.key === 'Backspace';
    const isArrowKey = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key);
    const isCtrlDown = event.ctrlKey;
    const isDotKey = event.key === '.';

    if (
      !isNumericKey &&
      !isControlKey &&
      !isDeleteKey &&
      !isBackspaceKey &&
      !isArrowKey &&
      !(isCtrlDown && (isDeleteKey || isBackspaceKey)) &&
      !(name === 'price' && isDotKey && !value.includes('.'))
    ) {
      event.preventDefault();
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
                  <Button type="submit">{t('admin.productEdit.save')}</Button>
                </Box>
              </Stack>
            </Box>
          </form>
        </>
      )}
    </main>
  );
};
