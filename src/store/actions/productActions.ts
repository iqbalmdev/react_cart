import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImages } from "../services"; // Assume this fetches images

export const fetchProductImages = createAsyncThunk<string, string>(
  "products/fetchImages",
  async (productName: string) => {
    const images = await fetchImages(productName, 1);
    return images[0]?.url || ""; // Ensure it always returns a string
  }
);
