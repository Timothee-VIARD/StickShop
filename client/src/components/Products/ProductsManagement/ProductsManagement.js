import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useHistory } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSnackbar } from 'notistack';

export const ProductsManagement = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();

  const columns = [
    {
      field: 'id',
      renderHeader: () => <Typography className="pl-4">{t('admin.id')}</Typography>,
      resizable: false,
      renderCell: (params) => <Typography className="pl-4 h-full content-center">{params.value}</Typography>
    },
    { field: 'name', headerName: t('admin.name'), width: 200, resizable: false },
    { field: 'price', headerName: t('admin.price'), resizable: false },
    { field: 'quantity', headerName: t('admin.quantity'), resizable: false },
    { field: 'description', headerName: t('admin.description'), resizable: false, flex: 1 },
    {
      field: 'inStock',
      headerName: t('admin.inStock'),
      width: 150,
      resizable: false,
      renderCell: (params) => {
        return params.value ? t('global.true') : t('global.false');
      }
    },
    {
      field: 'action',
      headerName: t('admin.actions'),
      resizable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton component={Link} to={`/admin/product/${params.row.id}`}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      }
    }
  ];

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/admin/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du produit');
        }
        return response.json();
      })
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        enqueueSnackbar(t('admin.deleted'), {
          variant: 'success',
          action: (key) => (
            <IconButton size="small" color="primary" onClick={() => closeSnackbar(key)}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          )
        });
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du produit:', error);
      });
  };
  useEffect(() => {
    fetch(`http://localhost:3001/admin/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits:', error);
      });
  }, []);

  const handleCreate = () => {
    history.push('/admin/create');
  };

  return (
    <main>
      <Typography variant="h4" className="pt-14 pb-2 flex-grow text-center">
        {t('admin.title')}
      </Typography>
      <Box className="m-10">
        <Stack direction="row" className="justify-between mb-2">
          <Typography variant="h6">{t('admin.subtitle')}</Typography>
          <Button variant="contained" onClick={handleCreate}>
            {t('admin.createProduct.title')}
          </Button>
        </Stack>
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          autoHeight
          pageSizeOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </main>
  );
};
