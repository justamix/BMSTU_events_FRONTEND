import { FC, useState } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "src/thunks/authThunks";

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Вызов Thunk
    const result = await dispatch<any>(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      console.log("Успешный вход и данные пользователя:", result.payload);
      navigate("/classrooms"); // Переход на страницу профиля
    } else {
      console.error("Ошибка при логине:", result.payload);
      alert(result.payload);
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Войти</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Логин:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите логин"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
            />
          </div>
          <button type="submit" className="submit-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
