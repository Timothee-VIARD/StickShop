import React, { useContext, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../../../../../contexts/CartContext';
import ProductInformation from '../ProductInformation/ProductInformation';
import { useTranslation } from 'react-i18next';
import { CurrencyContext } from '../../../../../contexts/CurrencyContext';

/**
 * Commponent for the Menu
 */
const Product = ({ product }) => {
  const { t } = useTranslation();

  const { addToCart, resetDocumentTitle } = useContext(CartContext);
  const { getCurrency } = useContext(CurrencyContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onBuy = () => {
    addToCart(product);
    resetDocumentTitle();
  };

  return (
    <>
      <Card className="cardBackgroundColor rounded-2xl h-full bg-opacity-50 flex flex-col justify-between">
        <Box>
          <CardMedia
            sx={{ height: 140 }}
            image={`${process.env.REACT_APP_API_URL}${product.image}`}
            title={product.name}
            onClick={handleOpenModal}
            className="hover:cursor-pointer hover:opacity-50 transition duration-500 ease-in-out"
          />
          <CardContent className="pb-0">
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {`${t('shop.shopItem.price')} : ${product.price} ${t(`parameters.currency.${getCurrency()}`)}`}
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <Button size="small" color="inherit" className="text-black gap-3 rounded-2xl p-3 m-1" onClick={onBuy}>
            <ShoppingCartIcon />
            <Typography variant="p">{t('shop.shopItem.addButton')}</Typography>
          </Button>
        </CardActions>
      </Card>
      <ProductInformation product={product} isOpen={isModalOpen} handleOpenModal={handleOpenModal} />
    </>
  );
};

export default Product;
