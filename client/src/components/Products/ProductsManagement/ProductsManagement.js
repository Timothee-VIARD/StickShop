import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useHistory } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSnackbar } from 'notistack';
import { numberRound } from '../../../utils/global/Numbers';
import { CurrencyContext } from '../../../contexts/CurrencyContext';

export const ProductsManagement = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { getCurrency } = useContext(CurrencyContext);
  const history = useHistory();

  const columns = [
    {
      field: 'id',
      renderHeader: () => <Typography className="pl-4">{t('admin.id')}</Typography>,
      width: 82,
      resizable: false,
      disableColumnMenu: true,
      renderCell: (params) => <Typography className="pl-4 h-full content-center">{params.value}</Typography>
    },
    {
      field: 'name',
      headerName: t('admin.name'),
      width: 200,
      resizable: false,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'price',
      headerName: t('admin.price'),
      width: 80,
      resizable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Typography variant="inherit">
            {numberRound(parseFloat(params.row.price))} {t(`parameters.currency.${getCurrency()}`)}
          </Typography>
        );
      }
    },
    {
      field: 'quantity',
      headerName: t('admin.quantity'),
      width: 80,
      resizable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Typography variant="inherit" className={`${params.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {params.value}
          </Typography>
        );
      }
    },
    {
      field: 'inStock',
      headerName: t('admin.inStock'),
      width: 110,
      resizable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Typography variant="inherit" className={`${params.value ? 'text-green-600' : 'text-red-600'}`}>
            {params.value ? t('global.true') : t('global.false')}
          </Typography>
        );
      }
    },
    {
      field: 'description',
      headerName: t('admin.description'),
      resizable: false,
      disableColumnMenu: true,
      sortable: false,
      flex: 1
    },
    {
      field: 'action',
      headerName: t('admin.actions'),
      headerAlign: 'center',
      resizable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box className="flex justify-center items-center h-full">
            <IconButton component={Link} to={`/admin/product/${params.row.id}`}>
              <Edit className="text-green-600" />
            </IconButton>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon className="text-red-600" />
            </IconButton>
          </Box>
        );
      }
    }
  ];

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
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
    fetch(`${process.env.REACT_APP_API_URL}/admin/`)
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
    <main className="flex-grow">
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
