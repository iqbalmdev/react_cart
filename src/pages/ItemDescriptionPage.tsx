import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { addToCart } from "../store/reducer/cartSlice";
import { Container, Typography, Card, CardMedia, CardContent, Button, Box } from "@mui/material";


interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  active: boolean;
  description:string;
  image:string
}
const ItemDescriptionPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) =>
    state.products.find((product: Product) => product.id === parseInt(productId))
  );
  const cart = useSelector((state: RootState) => state.cart);
  const cartItem = cart.find((item) => item.id === parseInt(productId));
  const quantityInCart = cartItem?.quantity || 0;

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (quantityInCart >= product.stock) {
      alert("Cannot add more items. Stock limit reached.");
      return;
    }
    dispatch(addToCart(product.id));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Price: ${product.price}
          </Typography>
          <Typography variant="body2">Stock: {product.stock}</Typography>
          <Typography variant="body2">In Cart: {quantityInCart}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            disabled={quantityInCart >= product.stock}
            sx={{ mt: 2 }}
          >
            {quantityInCart >= product.stock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ItemDescriptionPage;
