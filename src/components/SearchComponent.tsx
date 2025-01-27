import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Stack } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useDebounce } from "./../hooks"; 

// SearchComponent props
interface SearchComponentProps {
  onSearch: (query: string) => void;
  className?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, className }) => {
  const { control, handleSubmit, watch } = useForm();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500); 

  // On form submit
  const onSubmit = () => {
    onSearch(debouncedQuery); 
  };


  const queryValue = watch('query', '');


  useEffect(() => {
    setSearchQuery(queryValue);
  }, [queryValue]);

  return (
    <Stack direction="row" spacing={1} alignItems="center" className={className}>
      <Stack flex={1}>
        <Controller
          name="query"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search products..."
              sx={{ backgroundColor: '#fff', borderRadius: 2 }}
            />
          )}
        />
      </Stack>
      <IconButton onClick={handleSubmit(onSubmit)}>
        <SearchIcon />
      </IconButton>
    </Stack>
  );
};

export default SearchComponent;
