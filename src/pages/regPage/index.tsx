import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "src/api"; // Импорт API
import "./index.css"; // Стили

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Отправляем данные на сервер
      const response = await api.users.usersRegisterCreate(formData);

      if (response.status === 201) {
        alert("Регистрация прошла успешно");
        navigate("/login"); // Перенаправляем на страницу логина
      }
    } catch (err: any) {
      console.error("Ошибка регистрации:", err);
      setError("Ошибка регистрации. Проверьте введенные данные.");
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Введите email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Логин:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Введите логин"
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name">Имя:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              placeholder="Введите имя"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Фамилия:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              placeholder="Введите фамилию"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Введите пароль"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">
            Зарегистрироваться
          </button>
        </form>
        <div className="register-container">
          <button
            className="register-button"
            onClick={() => navigate("/login")}
          >
            Уже есть аккаунт? Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
