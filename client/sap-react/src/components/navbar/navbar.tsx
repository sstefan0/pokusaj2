import { Link, Outlet } from "react-router-dom";
import "./navbar-style.css";

import { useAppDispatch, useAppSelector } from "../../store/configureStore";

import { currentUser, deleteUser } from "../../pages/Autentifikacija/authSlice";
import { useEffect } from "react";

import DiamondSharpIcon from "@mui/icons-material/DiamondSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const Navbar = () => {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const buttonHandler = () => {
    dispatch(deleteUser());
    localStorage.removeItem("user");
  };
  useEffect(() => {
    dispatch(currentUser());
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
              <Link className="right-link" to="/">
                LOGO
              </Link>
            </Typography>

            <div className="center-links">
              <Link to="/products" className="center-link">
                PROZOR
              </Link>

              <Link to="/maps" className="center-link">
                PROZOR
              </Link>
              <Link to="/" className="center-link">
                PROZOR
              </Link>
            </div>

            {user ? (
              <div className="right-links">
                <Link to={"/profile"} className="right-link">
                  {user.email}
                </Link>

                <Link to={"/"} onClick={buttonHandler} className="right-link">
                  <LogoutSharpIcon />
                </Link>
              </div>
            ) : (
              <div className="right-links">
                <Link className="right-link" to="/sign-in">
                  PRIJAVA
                </Link>
                <Link className="right-link" to="/sign-up">
                  REGISTRACIJA
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
};
export default Navbar;
