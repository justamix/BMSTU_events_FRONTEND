import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "src/api";
import './index1.css'; // Убедитесь, что стили подключены правильно

interface UserInfo {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
}

const EditUserPage: FC = () => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [formData, setFormData] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Загрузка данных пользователя по userId
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.users.usersMeList(userId); // Передаем userId в запрос
        setUserInfo(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error("Ошибка загрузки данных пользователя", err);
        setError("Не удалось загрузить данные пользователя");
      }
    };
    if (userId) {
      getUser(); // Запускаем загрузку, только если есть userId
    }
  }, [userId]); // Перезапускать эффект при изменении userId

  // Обработчик изменений данных в форме
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData) {
        await api.users.usersUpdateUpdate(formData); // API запрос для обновления данных пользователя
        navigate(`/profile`); // Перенаправление на страницу профиля
      }
    } catch (err) {
      console.error("Ошибка при обновлении данных", err);
      setError("Не удалось обновить данные.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Редактировать данные пользователя</h1>

      {/* Показываем ошибку, если есть */}
      {error && <div className="error-message">{error}</div>}

      {/* Форма редактирования */}
      {userInfo ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="username">Никнейм:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData?.username || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="first_name">Имя:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData?.first_name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Фамилия:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData?.last_name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Введите новый пароль"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Сохранить изменения
          </button>
        </form>
      ) : (
        <p>Загрузка данных пользователя...</p>
      )}
    </div>
  );
};

export default EditUserPage;
