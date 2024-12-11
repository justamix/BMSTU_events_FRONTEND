import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import CartClassroomCard from "components/CartClassroomCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { removeCartItem, resetCartCount } from "src/slices/cartSlice"; // Actions
import { useNavigate } from "react-router-dom";
import { api } from "src/api"; // Ваши API-запросы
import "./index.css";

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.classrooms_count.cartItems);
  const eventId = useSelector((state: RootState) => state.classrooms_count.draftId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleDeleteFromCart = async (classroomId: number) => {
    // try {
    //   const response = await api.events.eventsDeleteClassroomDelete(
    //     String(eventId),
    //     String(classroomId)
    //   );

    //   if (response.status === 204) {
    //     console.log("Удаление из API успешно, удаляем из Redux");
    //     dispatch(removeCartItem(classroomId));

    //     if (cartItems.length === 1) {
    //       dispatch(resetCartCount());
    //       navigate("/classrooms");
    //     }
    //   } else {
    //   }
    // } catch (err) {
    //   console.error("Ошибка при удалении аудитории:", err);
    // }
  };

  const handleSubmitOrder = async () => {
    try {
      const response = await api.events.eventsUpdateStatusUserUpdate(eventId); // Вызов метода update_status_user
      if (response.status === 200) {
        console.log("Заказ оформлен успешно");
        alert("Ваш заказ успешно оформлен!");
        navigate("/classrooms");
      } else {
        setError("Ошибка при оформлении заказа.");
      }
    } catch (err) {
      console.error("Ошибка при оформлении заказа:", err);
      setError("Ошибка при оформлении заказа.");
    }
  };

  const handleDeleteCart = async () => {
    try {
      const response = await api.events.eventsDeleteDelete(eventId); // Вызов метода delete_event
      if (response.status === 200) {
        console.log("Корзина удалена успешно");
        dispatch(resetCartCount()); // Сбрасываем состояние корзины
        navigate("/classrooms"); // Перенаправляем на страницу аудиторий
      } else {
        setError("Ошибка при удалении корзины.");
      }
    } catch (err) {
      console.error("Ошибка при удалении корзины:", err);
      setError("Ошибка при удалении корзины.");
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/classrooms");
    }
  }, [cartItems, navigate]);

  return (
    <Container className="cart-page-container">
      <h1 className="cart-title">Моя корзина</h1>

      {cartItems.length === 0 && <p>Корзина пуста.</p>}

      <Row>
        {cartItems.map((item) => (
          <Col key={item.classroom_id} xs="12" className="mb-3">
            <CartClassroomCard
              classroomId={item.classroom_id}
              eventId={eventId!}
              name={item.name}
              address={item.address}
              photoUrl={item.url}
              onDelete={handleDeleteFromCart}
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

      {error && <div className="error-message mt-3">{error}</div>}
    </Container>
  );
};

export default CartPage;
