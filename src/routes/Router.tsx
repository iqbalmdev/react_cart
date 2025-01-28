import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateLayout } from "../layouts";
import { NotFound } from "../pages";
import { useSelector } from "react-redux";
import { RootState } from '../store/index';
import { LoginPage, HomePage, ProductListingPage, CartPage,CategoryPage,ManageCategoryPage,ProductFormPage ,CategoryProductListPage,OrderPage,ItemDescriptionPage} from "../pages";

const AppRouter = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateLayout isAuthenticated={isAuthenticated} />}>
          {/* Define the HomePage route */}
          <Route index element={<HomePage />} />
          <Route path="products/:categoryId" element={<ProductListingPage />} />
          <Route path="product/:productId" element={<ItemDescriptionPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="categories/create" element={<ManageCategoryPage />} />
          <Route path="categories/edit/:categoryId" element={<ManageCategoryPage />} />
          <Route path="products/create/:categoryId" element={<ProductFormPage />} />
          <Route path="/product/:productId" element={<ItemDescriptionPage />} />
          <Route path="products/:categoryId/edit/:productId" element={<ProductFormPage />} />
          <Route path="products/users/:categoryId/" element={<CategoryProductListPage />} />
          <Route path="/orders" element={<OrderPage />} />
          {/* Uncomment and add other routes as needed */}
          {/* <Route path="orders" element={<OrdersListingPage />} />
           */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
