import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import CartClassroomCard from "components/CartClassroomCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { useNavigate } from "react-router-dom";
import { api } from "src/api";
import "./index.css";

interface Classroom {
  classroom_id: number;
  name: string;
  address: string;
  url?: string;
}

const CartPage: React.FC = () => {
  const eventId = useSelector((state: RootState) => state.classrooms_count.draftId); // Получаем eventId из Redux
  const [cartItems, setCartItems] = useState<Classroom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classroomsCount = useSelector(
    (state: RootState) => state.classrooms_count.classroomsCount
  );
  useEffect(() => {
    const fetchCartData = async () => {
      if (!eventId) {
        setError("Не найден идентификатор события.");
        navigate("/classrooms"); // Переадресация, если eventId отсутствует
        return;
      }
      if (!classroomsCount) {
        setError("Не найден идентификатор события.");
        navigate("/classrooms"); // Переадресация, если eventId отсутствует
        return;
      }
      try {
        const response = await api.events.eventsRead(String(eventId));
        if (response.data.classrooms.length === 0) {
          navigate("/classrooms"); // Переадресация, если корзина пустая
        } else {
          setCartItems(response.data.classrooms || []);
        }
      } catch (err) {
        console.error("Ошибка загрузки данных корзины:", err);
        setError("Не удалось загрузить данные корзины.");
        navigate("/classrooms"); // Переадресация при ошибке загрузки
      }
    };

    fetchCartData();
  }, [eventId, navigate, classroomsCount]);

  const handleSubmitOrder = async () => {
    try {
      alert("Ваш заказ успешно оформлен!");
      navigate("/classrooms");
    } catch (err) {
      setError("Ошибка при оформлении заказа.");
    }
  };

  const handleDeleteCart = async () => {
    try {
      const response = await api.events.eventsDeleteDelete(String(eventId));
      if (response.status === 200) {
        navigate("/classrooms");} // Переадресация, если корзина пустая
    } catch (err) {
      setError("Ошибка при удалении корзины.");
    }
  };

  return (
    <Container className="cart-page-container">
      <h1 className="cart-title">Моя корзина</h1>

      {error && <div className="error-message">{error}</div>}
      {cartItems.length === 0 && !error && <p>Корзина пуста.</p>}

      <Row>
        {cartItems.map((item) => (
          <Col key={item.classroom_id} xs="12" className="mb-3">
            <CartClassroomCard
              classroomId={item.classroom_id}
              eventId={parseInt(eventId!)}
              name={item.name}
              address={item.address}
              photoUrl={item.url}
              onDelete={() => {
                setCartItems(cartItems.filter((cart) => cart.classroom_id !== item.classroom_id));
              }}
            />
          </Col>
        ))}
      </Row>

      {cartItems.length > 0 && (
        <div className="cart-actions d-flex justify-content-between mt-4">
          <Button color="success" onClick={handleSubmitOrder}>
            Оформить заказ
          </Button>
          <Button color="danger" onClick={handleDeleteCart}>
            Удалить корзину
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CartPage;
