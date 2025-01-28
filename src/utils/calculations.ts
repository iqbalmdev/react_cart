// utils/calculations.ts
import { Product } from '../store/reducer/productSlice';
import { Order } from '../store/reducer/orderSlice';

// Calculate available stock for a category
export const calculateAvailableStock = (
  categoryId: string,
  products: Product[],
  orders: Order[]
) => {
  const categoryProducts = products.filter((product) => product.categoryId === categoryId);

  return categoryProducts.reduce((totalStock, product) => {
    const soldQuantityFromOrders = orders
      .flatMap((order) => order.items)
      .filter((item) => item.id === product.id)
      .reduce((sum, item) => sum + item.quantity, 0);

    return totalStock + (product.stock - soldQuantityFromOrders);
  }, 0);
};

// Calculate total sales for a category
export const calculateTotalSales = (
  categoryId: string,
  products: Product[],
  orders: Order[]
) => {
  return orders
    .flatMap((order) => order.items)
    .filter((item) => {
      const product = products.find((product) => product.id === item.id);
      return product && product.categoryId === categoryId;
    })
    .reduce((totalSales, item) => {
      const product = products.find((product) => product.id === item.id);
      return product ? totalSales + product.price * item.quantity : totalSales;
    }, 0);
};

// Calculate remaining stock for a product
export const calculateRemainingStock = (productId: string, products: Product[], orders: Order[]) => {
  const soldQuantityFromOrders = orders
    .flatMap((order) => order.items)
    .filter((item) => item.id === productId)
    .reduce((sum, item) => sum + item.quantity, 0);

  const product = products.find((product) => product.id === productId);
  return product ? product.stock - soldQuantityFromOrders : 0;
};

// Calculate total sales for a product
export const calculateProductSales = (productId: string, orders: Order[]) => {
  return orders
    .flatMap((order) => order.items)
    .filter((item) => item.id === productId)
    .reduce((totalSales, item) => item.price * item.quantity + totalSales, 0);
};
