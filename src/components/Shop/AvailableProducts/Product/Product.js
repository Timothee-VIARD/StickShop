import React, {useContext, useState} from "react";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {CartContext} from "../../../../context/CartContext";
import ProductInformation from "../ProductInformation/ProductInformation";
import {useTranslation} from "react-i18next";

/**
 * Commponent for the Menu
 */
const Product = ({product}) => {
  const {t} = useTranslation();

  const {addToCart} = useContext(CartContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <Card className="rounded-2xl h-full bg-amber-100 bg-opacity-50 flex flex-col justify-between">
        <Box>
          <CardMedia
            sx={{height: 140}}
            image={product.image}
            title={product.name}
            onClick={handleOpenModal}
            className="hover:cursor-pointer hover:opacity-50 transition duration-500 ease-in-out"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {`${t('shop.shopItem.price')} : ${product.price} €`}
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <Button size="small" color="inherit" className="text-black gap-3 rounded-2xl p-3 m-1" onClick={() => addToCart(product)}>
            <ShoppingCartIcon/>
            <Typography variant="p">
              {t('shop.shopItem.addButton')}
            </Typography>
          </Button>
        </CardActions>
      </Card>
      <ProductInformation product={product} isOpen={isModalOpen} handleOpenModal={handleOpenModal}/>
    </>
  );
};

export default Product;
