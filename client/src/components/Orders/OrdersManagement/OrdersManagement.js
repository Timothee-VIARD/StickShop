import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, SkipNext, SkipPrevious } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { numberRound } from '../../../utils/global/Numbers';
import { CurrencyContext } from '../../../contexts/CurrencyContext';

export const OrdersManagement = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { getCurrency } = useContext(CurrencyContext);

  const columns = [
    {
      field: 'orderNumber',
      headerName: t('admin.orders.orderNumber'),
      resizable: false,
      width: 170,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'userId',
      headerName: t('admin.orders.userId'),
      resizable: false,
      width: 110,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'status',
      headerName: t('admin.orders.status'),
      headerAlign: 'center',
      resizable: false,
      width: 200,
      disableColumnMenu: true,
      renderCell: (params) => {
        const isPending = params.row.status === 'PENDING' && true;
        const isDelivering = params.row.status === 'DELIVERING' && true;
        const isDelivered = params.row.status === 'DELIVERED' && true;
        const isCancelled = params.row.status === 'CANCELLED' && true;
        return (
          <Stack direction="row" spacing={1} className="items-center h-full justify-center">
            <IconButton
              size="small"
              onClick={() => handleSwitchStatus(params.row, false)}
              disabled={isCancelled || isPending}
            >
              <SkipPrevious />
            </IconButton>
            <Typography
              className={`rounded-2xl px-2 text-[#fff9eb] 
              ${isPending && 'bg-gray-600'} 
              ${isDelivering && 'bg-yellow-600'} 
              ${isDelivered && 'bg-green-600'} 
              ${isCancelled && 'bg-red-600'}`}
            >
              {getStatus(params.row.status)}
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleSwitchStatus(params.row, true)}
              disabled={isCancelled || isDelivered}
            >
              <SkipNext />
            </IconButton>
          </Stack>
        );
      }
    },
    {
      field: 'orderDate',
      headerName: t('admin.orders.orderDate'),
      resizable: false,
      width: 150,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'deliveryDate',
      headerName: t('admin.orders.deliveryDate'),
      resizable: false,
      width: 140,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'totalPrice',
      headerName: t('admin.orders.totalPrice'),
      resizable: false,
      width: 90,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Typography variant="inherit">
            {numberRound(parseFloat(params.row.totalPrice))} {t(`parameters.currency.${getCurrency()}`)}
          </Typography>
        );
      }
    },
    {
      field: 'paymentMethod',
      headerName: t('admin.orders.paymentMethod'),
      resizable: false,
      width: 170,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'address',
      headerName: t('admin.orders.address'),
      resizable: false,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const order = orders.find((order) => order.id === params.row.id);
        const address = order.address + ', ' + order.city + ' ' + order.zipCode + ', ' + order.country;
        return (
          <Box className="h-full flex items-center">
            <Tooltip title={address} placement="top-start">
              <Typography variant="inherit" className="truncate">
                {address}
              </Typography>
            </Tooltip>
          </Box>
        );
      }
    },
    {
      field: 'delete',
      headerName: t('admin.orders.delete'),
      headerAlign: 'center',
      resizable: false,
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box className="flex justify-center items-center h-full">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <Delete className="text-red-600" />
            </IconButton>
          </Box>
        );
      }
    }
  ];

  const handleSwitchStatus = (row, isNext) => {
    const currentStatus = row.status;
    const id = row.id;
    switch (currentStatus) {
      case 'PENDING':
        if (isNext) {
          handleChangeStatus(id, 'DELIVERING');
        }
        break;
      case 'DELIVERING':
        if (isNext) {
          handleChangeStatus(id, 'DELIVERED');
        } else {
          handleChangeStatus(id, 'PENDING');
        }
        break;
      case 'DELIVERED':
        if (!isNext) {
          handleChangeStatus(id, 'DELIVERING');
        }
        break;
      default:
        break;
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    const order = orders.find((order) => order.id === id);
    order.status = newStatus;

    try {
      const response = await fetch(`http://localhost:3001/orders/updateStatus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      } else {
        setOrders([...orders]);
      }
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

  const getStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return t('admin.orders.steps.paymentValidation');
      case 'DELIVERING':
        return t('admin.orders.steps.delivering');
      case 'DELIVERED':
        return t('admin.orders.steps.delivered');
      case 'CANCELLED':
        return t('admin.orders.steps.cancelled');
      default:
        return '';
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/orders/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du produit');
        } else {
          setOrders(orders.filter((order) => order.id !== id));
          enqueueSnackbar(t('admin.orders.deleted'), {
            variant: 'success',
            action: (key) => (
              <IconButton size="small" color="primary" onClick={() => closeSnackbar(key)}>
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            )
          });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression d'une commande :", error);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3001/orders`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des commandes:', error);
      });
  }, []);

  return (
    <main className="flex-grow">
      <Typography variant="h4" className="pt-14 pb-2 flex-grow text-center">
        {t('admin.orders.title')}
      </Typography>
      <Box className="m-10">
        <DataGrid
          rows={orders}
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
