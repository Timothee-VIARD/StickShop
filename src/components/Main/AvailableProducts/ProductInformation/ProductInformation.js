import React, {useContext} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Modal, Typography} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {CartContext} from "../../../../context/CartContext";

/**
 * Commponent to have more information for a product
 */
const ProductInformation = ({product, isOpen, handleOpenModal}) => {

  const {addToCart} = useContext(CartContext);

  return (
    <Modal open={isOpen} onClose={handleOpenModal} className="flex flex-row justify-center items-center">
      <Card className="rounded-2xl w-1/2 h-5/6 overflow-auto">
        <CardMedia
          sx={{height: 280}}
          image={product.image}
          title={product.name}
          onClick={handleOpenModal}
        />
        <CardContent className="bg-amber-100 bg-opacity-50 p-10 ">
          <Typography gutterBottom variant="h3" component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {`Prix : ${product.price} €`}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {`Description : ${product.description}`}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {`Stock : ${product.quantity}`}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {`Catégorie : ${product.category}`}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {`Note : ${product.rating}`}
          </Typography>
        </CardContent>
        <CardActions className="bg-amber-100 bg-opacity-50 p-10">
          <Button size="small" color="inherit" className="text-black gap-3 rounded-2xl" onClick={() => addToCart(product)}>
            <ShoppingCartIcon/>
            <Typography variant="p">
              Ajouter au panier
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default ProductInformation;
