import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RootState } from "../store";
import { addProduct, editProduct } from "../store/reducer/productSlice";
import { TextField, Button, Box, Typography } from "@mui/material";
import { fetchProductImages } from "../store/actions/productActions";

// Define the form type that excludes id, categoryId, and active
interface ProductForm {
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

const ProductFormPage: React.FC = () => {
  const { productId, categoryId } = useParams<{ productId?: string; categoryId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get existing product details if editing
  const existingProduct = useSelector((state: RootState) =>
    productId ? state.products.products.find((product) => product.id === productId) : null
  );

  // Initialize form data
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<ProductForm>();

  // Pre-fill form values if editing an existing product
  useEffect(() => {
    if (existingProduct) {
      setValue("name", existingProduct.name);
      setValue("price", existingProduct.price);
      setValue("stock", existingProduct.stock);
      setValue("image", existingProduct.image);
      setValue("description", existingProduct.description);
    }
  }, [existingProduct, setValue]);

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    let productData = {
      name: data.name,
      price: data.price,
      stock: data.stock,
      categoryId,
      image: data.image,
      description: data.description,
      active: true, // default to true for a new product
    };

    if(data?.image){
       let   imageUrl = await dispatch(fetchProductImages(data.image)).unwrap();
       productData = {
        ...productData,
        image:imageUrl
       }
    }
    if (productId) {
      // Edit existing product
      dispatch(editProduct({ ...productData, id: productId, image:imageUrl}));
      navigate(`/products/${categoryId}`);
    } else {
      // Add new product
      dispatch(addProduct(productData));
    }

    navigate(`/products/${categoryId}`);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>{productId ? "Edit Product" : "Create Product"}</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Using Controller for the name field */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              label="Name"
              fullWidth
              {...field}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
              sx={{ mb: 2 }}
            />
          )}
        />

        {/* Using Controller for the price field */}
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required" }}
          render={({ field }) => (
            <TextField
              label="Price"
              fullWidth
              type="number"
              {...field}
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ""}
              sx={{ mb: 2 }}
            />
          )}
        />

        {/* Using Controller for the stock field */}
        <Controller
          name="stock"
          control={control}
          rules={{ required: "Stock is required" }}
          render={({ field }) => (
            <TextField
              label="Stock"
              fullWidth
              type="number"
              {...field}
              error={!!errors.stock}
              helperText={errors.stock ? errors.stock.message : ""}
              sx={{ mb: 2 }}
            />
          )}
        />

        {/* Using Controller for the image field */}
        <Controller
          name="image"
          control={control}
          rules={{ required: "Image URL is required" }}
          render={({ field }) => (
            <TextField
              label="Image URL"
              fullWidth
              {...field}
              error={!!errors.image}
              helperText={errors.image ? errors.image.message : ""}
              sx={{ mb: 2 }}
            />
          )}
        />

        {/* Using Controller for the description field */}
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              label="Description"
              fullWidth
              {...field}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
              sx={{ mb: 2 }}
            />
          )}
        />

        <Button variant="contained" type="submit">
          {productId ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Box>
  );
};

export default ProductFormPage;
