import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delCookie } from "src/slices/cookieSlice";
import { useNavigate } from "react-router-dom";
import { Button, Nav, Navbar, NavItem, NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import logo from "assets/logo.png";
import { RootState } from "src/store"; // Импортируем RootState для типизации
import "./index.css";
import { logoutUser } from "src/slices/userSlice";

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Извлекаем данные из Redux Store
  const { cookie } = useSelector((state: RootState) => state.cookie); // Состояние cookie
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user); // Данные о пользователе
  const classroomsCount = useSelector((state: RootState) => state.classrooms_count.classroomsCount);

  const handleLogout = () => {
    dispatch(delCookie());
    dispatch(logoutUser())
    navigate("/login");
  };

  return (
    <Navbar className="p-3 header-navbar" expand="lg">
      <NavLink tag={RRNavLink} to="/" className="header-brand d-flex align-items-center">
        <img src={logo} alt="МГТУ" className="header-logo" />
      </NavLink>
      <Nav className="ml-auto d-flex align-items-center">
        <NavItem className="nav-item-custom">
          <NavLink tag={RRNavLink} to="/classrooms" className="nav-link-custom">
            Аудитории
          </NavLink>
        </NavItem>
        {isAuthenticated || cookie ? (
          <>
            <NavItem className="nav-item-custom">
              <NavLink tag={RRNavLink} to="/my_events" className="nav-link-custom">
                Мои мероприятия
              </NavLink>
            </NavItem>
            <NavItem className="nav-item-custom">
            <NavLink 
                        tag={RRNavLink} 
                        to="/profile" 
                        style={{ color: getRandomColor() }} 
                    >
                        {user?.username || "пользователь"}
                    </NavLink>
            </NavItem>
            <NavItem className="nav-item-custom">
              <NavLink tag={RRNavLink} to="/draft_event" className="nav-link-custom">
                Корзина ({classroomsCount})
              </NavLink>
            </NavItem>
            <NavItem className="nav-item-custom">
              <Button color="link" onClick={handleLogout} className="nav-link-custom">
                Выйти
              </Button>
            </NavItem>
          </>
        ) : (
          <NavItem className="nav-item-custom">
            <NavLink tag={RRNavLink} to="/login" className="nav-link-custom">
              Войти
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
