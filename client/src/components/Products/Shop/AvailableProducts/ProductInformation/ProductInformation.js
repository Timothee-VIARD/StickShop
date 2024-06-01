import React, { useContext, useRef, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Modal, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../../../../../contexts/CartContext';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useTranslation } from 'react-i18next';
import { CurrencyContext } from '../../../../../contexts/CurrencyContext';

/**
 * Commponent to have more information for a product
 */
const ProductInformation = ({ product, isOpen, handleOpenModal }) => {
  const { t } = useTranslation();

  const { addToCart } = useContext(CartContext);
  const { getCurrency } = useContext(CurrencyContext);

  const [isBottom, setIsBottom] = useState(false);
  const modalRef = useRef(null);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop - 40 <= e.target.clientHeight;
    setIsBottom(bottom);
  };

  return (
    <Modal open={isOpen} onClose={handleOpenModal} className="flex flex-row justify-center items-center">
      <Box className="w-11/12 h-2/3 md:w-1/2 md:h-5/6 relative">
        <Card className="h-full overflow-auto rounded-2xl scrollbar-hide" onScroll={handleScroll} ref={modalRef}>
          <CardMedia sx={{ height: 380 }} image={product.image} title={product.name} onClick={handleOpenModal} />
          <CardContent className="bg-amber-100 bg-opacity-50 p-10 pb-2">
            <Typography gutterBottom variant="h3" component="div">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {`${t('shop.shopItem.price')} : ${product.price} ${t(`parameters.currency.${getCurrency()}`)}`}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {`${t('shop.shopItem.description')} : ${product.description}`}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {`${t('shop.shopItem.quantity')} : ${product.quantity}`}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {`${t('shop.shopItem.category')} : ${product.category}`}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {`${t('shop.shopItem.rate')} : ${product.rating}`}
            </Typography>
          </CardContent>
          <CardActions className="bg-amber-100 bg-opacity-50 p-10 pt-0">
            <Button
              size="small"
              color="inherit"
              className="text-black gap-3 rounded-2xl p-5"
              onClick={() => addToCart(product)}
            >
              <ShoppingCartIcon />
              <Typography variant="p">{t('shop.shopItem.addButton')}</Typography>
            </Button>
          </CardActions>
        </Card>
        {!isBottom && (
          <Box className="flex flex-col items-center bg-black bg-opacity-5">
            <KeyboardArrowDownRoundedIcon className="absolute bottom-0 w-full rounded-b-2xl h-12" fontSize="large" />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ProductInformation;
