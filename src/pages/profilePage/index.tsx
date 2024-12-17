import { FC } from "react";
import "./index.css"; // Подключаем стили
import { useNavigate } from "react-router-dom"; // Навигация
import { useDispatch, useSelector } from "react-redux"; // Redux
import { delCookie } from "src/slices/cookieSlice"; // Очистка куки
import { RootState } from "src/store"; // Типизация RootState
import { logoutUser } from "src/slices/userSlice"; // Экшен для выхода пользователя

const PrivateUser: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Получаем данные пользователя из Redux Store
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(delCookie()); // Удаляем сессионный cookie
    dispatch(logoutUser()); // Сбрасываем пользователя в Redux
    navigate("/login"); // Перенаправляем на страницу логина
  };

  return (
    <div className="main-profile-div">
      <h1 className="profile-title">Личный кабинет</h1>

      {/* Проверка авторизации */}
      {!isAuthenticated || !user ? (
        <p className="error-message"></p>
      ) : (
        <div className="user-info">
          <p>
            <span className="label">Логин:</span> {user.username}
          </p>
          <p>
            <span className="label">Имя:</span> {user.first_name}
          </p>
          <p>
            <span className="label">Фамилия:</span> {user.last_name}
          </p>
          <p>
            <span className="label">Email:</span> {user.email}
          </p>
          <p>
            <span className="label">Дата регистрации:</span>{" "}
            {new Date(user.date_joined).toLocaleDateString()}
          </p>
          <div className="action-buttons">
            <button
              onClick={() => navigate(`/users/${user.id}/edit`)} // Переход на страницу редактирования
              className="edit-button"
            >
              Изменить данные
            </button>
            <button onClick={handleLogout} className="logout-button">
              Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateUser;
