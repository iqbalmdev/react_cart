import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { Stack, Card, CardMedia, CardContent, Typography, Skeleton } from '@mui/material';

const HomePage: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.categories); // Access the categories array
  const navigate = useNavigate();

 // Simulate loading state (replace with actual loading logic if needed)
  const [isLoading,setIsLoading] = useState<boolean>(true)
  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },2000)
  })
  return (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold">
        Categories
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
        {isLoading ? (
          // Show skeletons when loading
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={200}
              height={300}
              animation="wave"
              sx={{ borderRadius: 2 }}
            />
          ))
        ) : categories.length === 0 ? (
          // Show "No categories present" if categories are empty
          <Typography variant="h6" color="textSecondary">
            No categories available.
          </Typography>
        ) : (
          // Show categories when they are available
          categories.filter((cat)=>cat.active === true).map((category) => (
            <Card
              key={category.id}
              sx={{
                width: 200,
                cursor: 'pointer',
                boxShadow: 3,
                borderRadius: 2,
                textAlign: 'center',
              }}
              onClick={() => navigate(`/products/users/${category.id}`)}
            >
              <CardMedia
                component="img"
                image={category.image}
                alt={category.name}
                sx={{ height: 140 }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </Stack>
  );
};

export default HomePage;
