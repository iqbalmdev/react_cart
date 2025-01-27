import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface HeaderComponentProps {
  title?: string;
  logo?: string;
  links?: { label: string; href: string }[];
  onMenuClick?: () => void;
  onProfileClick?: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  title = 'My Application',
  logo,
  links = [],
  onMenuClick,
  onProfileClick,
}) => {
  const navigate = useNavigate();

  // Get cart item count from Redux store
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Menu Icon (Hamburger) */}
        {onMenuClick && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo */}
        {logo && (
          <Box component="img" src={logo} alt="Logo" sx={{ height: 40, marginRight: 2 }} />
        )}

        {/* Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
          {title}
        </Typography>

        {/* Cart Icon with Badge */}
        <IconButton onClick={() => navigate('/cart')} color="inherit">
          <Badge badgeContent={cartItemsCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* Settings Icon */}
        <IconButton onClick={() => navigate('/categories')} color="inherit">
          <SettingsIcon />
        </IconButton>

        {/* Orders Link */}
        <Button color="inherit" component={Link} to="/orders">
          Orders
        </Button>

        {/* Navigation Links */}
        {links.map((link, index) => (
          <Button
            key={index}
            color="inherit"
            href={link.href}
            sx={{ textTransform: 'none' }}
          >
            {link.label}
          </Button>
        ))}

        {/* Profile Icon */}
        {onProfileClick && (
          <IconButton color="inherit" onClick={onProfileClick}>
            <AccountCircleIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
