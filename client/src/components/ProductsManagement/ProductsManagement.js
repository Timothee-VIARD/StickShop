import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export const ProductsManagement = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);

  const columns = [
    {
      field: 'id',
      renderHeader: () => <Typography className="pl-4">{t('admin.id')}</Typography>,
      width: 90,
      renderCell: (params) => <Typography className="pl-4 h-full content-center">{params.value}</Typography>
    },
    { field: 'name', headerName: t('admin.name'), width: 200 },
    { field: 'price', headerName: t('admin.price'), width: 120 },
    { field: 'quantity', headerName: t('admin.quantity'), width: 120 },
    { field: 'description', headerName: t('admin.description'), width: 500 },
    {
      field: 'inStock',
      headerName: t('admin.inStock'),
      width: 120,
      renderCell: (params) => {
        return params.value ? t('global.true') : t('global.false');
      }
    },
    {
      field: 'action',
      headerName: t('admin.actions'),
      width: 200,
      renderCell: (params) => {
        return (
          <IconButton component={Link} to={`/admin/product/${params.row.id}`}>
            <Edit />
          </IconButton>
        );
      }
    }
  ];

  useEffect(() => {
    fetch(`http://localhost:3001`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits:', error);
      });
  }, []);

  return (
    <main>
      <Typography variant="h4" className="pt-14 pb-2 flex-grow text-center">
        {t('admin.title')}
      </Typography>
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
        pageSizeOptions={[5]}
        disableSelectionOnClick
        className="m-10"
      />
    </main>
  );
};
