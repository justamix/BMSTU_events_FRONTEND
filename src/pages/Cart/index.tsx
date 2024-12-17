import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import CartClassroomCard from "components/CartClassroomCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { resetCartCount } from "src/slices/cartSlice"; // Actions
import { useNavigate } from "react-router-dom";
import { deleteCart, submitOrder } from "src/thunks/cartThunks";
import "./index.css";

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.classrooms_count.cartItems);
  const eventId = useSelector((state: RootState) => state.classrooms_count.draftId);
  const dispatch = useDispatch<any>(); // Типизируем Dispatch для Thunk
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleDeleteFromCart = (classroomId: number) => {
    // dispatch(deleteClassroomFromCart({ eventId: Number(eventId), classroomId }))
    //   .unwrap()
    //   .then(() => {
    //     if (cartItems.length === 1) {
    //       dispatch(resetCartCount());
    //       navigate("/classrooms");
    //     }
    //   })
    //   .catch((err) => {
    //     setError(err);
    //   });
  };

  const handleSubmitOrder = () => {
    dispatch(submitOrder({ eventId: Number(eventId) }))
      .unwrap()
      .then(() => {
        alert("Ваш заказ успешно оформлен!");
        navigate("/classrooms");
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleDeleteCart = () => {
    dispatch(deleteCart({ eventId: Number(eventId) }))
      .unwrap()
      .then(() => {
        navigate("/classrooms");
      })
      .catch((err) => {
        setError(err);
      });
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
              eventId={Number(eventId)!}
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
