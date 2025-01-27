import React, { useEffect } from "react";
import { TextField, Button, Paper, Typography, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { RootState, AppDispatch } from "../store";
import { fetchProductImages } from "../store/actions/productActions";

interface FormValues {
  name: string;
  image: string;
}

const ManageCategoryPage: React.FC = () => {
  const { categoryId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector((state: RootState) =>
    state.categories.categories.find((cat) => cat.id === categoryId)
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: "", image: "" },
  });

  useEffect(() => {
    if (category) {
      reset({ name: category.name, image: category.image });
    }
  }, [category, reset]);

  const onSubmit = async (data: FormValues) => {
    const { name, image } = data;

    let imageUrl = image;

    if (image) {
      try {
        imageUrl = await dispatch(fetchProductImages(name)).unwrap();
        console.log(imageUrl,"see image url")
  
        if (!imageUrl) {
          alert("No image found for the given name. Please provide an image URL.");
          return;
        }
      } catch (error) {
        console.error("Error fetching product image:", error);
        alert("Failed to fetch product image. Please provide an image URL.");
        return;
      }
    }

    if (categoryId) {
      dispatch({
        type: "categories/updateCategory",
        payload: { id: categoryId, name, image: imageUrl },
      });
      alert("Category updated successfully!");
    } else {
      dispatch({
        type: "categories/addCategory",
        payload: {
          id: Date.now().toString(),
          name,
          image: imageUrl,
          active: true,
          availableStock: 0,
          totalSales: 0,
        },
      });
      alert("Category created successfully!");
    }

    navigate("/categories")
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        {categoryId ? "Edit Category" : "Create Category"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Category name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Image URL (optional)"
                variant="outlined"
                error={!!errors.image}
                helperText={errors.image?.message || "Leave blank to fetch an image dynamically."}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            {categoryId ? "Update Category" : "Create Category"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default ManageCategoryPage;
