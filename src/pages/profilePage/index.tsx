import { FC, useEffect, useState } from "react";
import "./index.css"; // Подключаем стили
import { useNavigate } from "react-router-dom"; // Навигация
import { useDispatch } from "react-redux"; // Redux
import { delCookie } from "src/slices/cookieSlice"; // Очистка куки
import { api } from "src/api"; // Подключаем API

// Интерфейс для данных пользователя
interface UserInfo {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
}

export const PrivateUser: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // Состояние для данных пользователя
  const [error, setError] = useState<string | null>(null); // Состояние для ошибок
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Проверяем, есть ли сессионная кука
  const isAuthenticated = document.cookie.includes("session_id=");

  // Функция для получения данных пользователя
  const getUser = async () => {
    try {
      const response = await api.users.usersMeList(); // Получаем данные пользователя
      setUserInfo(response.data); // Сохраняем данные
    } catch (error) {
      console.error("Ошибка получения данных пользователя:", error);
      setError("Ошибка загрузки данных пользователя."); // Устанавливаем ошибку
    }
  };


  const handleLogout = async () => {
    try {
      await api.users.usersLogoutCreate(); 
      dispatch(delCookie()); 
      navigate("/login");
    } catch (error) {
      console.error("Ошибка выхода из аккаунта:", error);
      setError("Ошибка выхода из аккаунта.");
    }
  };


  useEffect(() => {
    if (!isAuthenticated) {
      setError("403 Forbidden - Доступ запрещен"); 
    } else {
      getUser(); 
    }
  }, [isAuthenticated]);

  return (
    <div className="main-profile-div">
      
      <h1 className="profile-title">Личный кабинет</h1>

      {/* Отображение ошибки 403, если пользователь не авторизован */}
      {error && !userInfo ? (
        <p className="error-message">{error}</p>
      ) : (
        // Информация о пользователе, если пользователь авторизован
        userInfo && (
          <div className="user-info">
            <p>
              <span className="label">Логин:</span> {userInfo.username}
            </p>
            <p>
              <span className="label">Имя:</span> {userInfo.first_name}
            </p>
            <p>
              <span className="label">Фамилия:</span> {userInfo.last_name}
            </p>
            <p>
              <span className="label">Email:</span> {userInfo.email}
            </p>
            <p>
              <span className="label">Дата регистрации:</span>{" "}
              {new Date(userInfo.date_joined).toLocaleDateString()}
            </p>
            <div className="action-buttons">
              <button
                onClick={() => navigate(`/users/${userInfo.id}/edit`)} // Переход на страницу редактирования
                className="edit-button"
              >
                Изменить данные
              </button>
              <button onClick={handleLogout} className="logout-button">
                Выйти
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PrivateUser;
