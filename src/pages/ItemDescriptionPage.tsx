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
  description: string;
  image: string;
}

const ItemDescriptionPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.products.products.find(
      (product: Product) => product.id === productId
    )
  );

  const cart = useSelector((state: RootState) => state.cart);
  const cartItem = cart.find((item) => item.id === productId);
  const quantityInCart = cartItem?.quantity || 0;

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1, // Add one item to cart
      })
    );
    alert("Product added to cart!");
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            sx={{ mt: 2 }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ItemDescriptionPage;
