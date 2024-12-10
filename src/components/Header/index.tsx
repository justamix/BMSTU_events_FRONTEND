import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delCookie } from "src/slices/cookieSlice";
import { useNavigate } from "react-router-dom";
import { Button, Nav, Navbar, NavItem, NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import logo from "assets/logo.png";
import { RootState } from "src/store"; // Импортируйте RootState для типизации
import "./index.css";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const { cookie } = useSelector((state: any) => state.cookie); // Считываем состояние из Redux

  // Получаем количество аудиторий в корзине
  const classroomsCount = useSelector((state: RootState) => state.classrooms_count.classroomsCount);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, [cookie, classroomsCount]); // Перерендеринг при изменении cookie и числа аудиторий в корзине 

  const handleLogout = () => {
    dispatch(delCookie());
    localStorage.removeItem("username");
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
        {cookie ? (
          <>
            <NavItem className="nav-item-custom">
              <NavLink tag={RRNavLink} to="/profile" className="nav-link-custom">
                <span className="nav-link-custom">{"Мои мероприятия"}</span>
              </NavLink>
            </NavItem>
            <NavItem className="nav-item-custom">
              <NavLink tag={RRNavLink} to="/profile" className="nav-link-custom">
                <span className="nav-link-custom">{username || "пользователь"}</span>
              </NavLink>
            </NavItem>
            <NavItem className="nav-item-custom">
              <NavLink tag={RRNavLink} to="/draft_event" className="nav-link-custom">
                <span className="nav-link-custom">
                  Корзина ({classroomsCount}) {/* Отображаем количество аудиторий */}
                </span>
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
