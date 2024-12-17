import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { updateUser } from "src/thunks/updateThunks";
import "./index1.css";

const EditUserPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.user); // Получаем данные пользователя из Store

  const [formData, setFormData] = useState({
    username: user?.username || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    password: "", // Для смены пароля
  });

  const [error, setError] = useState<string | null>(null);

  // Обработчик изменений в форме
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData, id: user?.id }; // Добавляем id пользователя
      await dispatch(updateUser(payload)).unwrap(); // Отправляем Thunk
      navigate("/profile"); // Переход на страницу профиля
    } catch (err) {
      console.error(err);
      setError("Ошибка при обновлении данных.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Редактировать данные пользователя</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="username">Никнейм:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="first_name">Имя:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Фамилия:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            name="password"
            placeholder="Введите новый пароль"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default EditUserPage;
