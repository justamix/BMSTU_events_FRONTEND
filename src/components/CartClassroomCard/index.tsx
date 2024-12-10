import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { api } from "src/api"; // Your API file
import { useState } from "react";
import { setCartCount, removeCartItem } from "src/slices/cartSlice"; // Добавляем `removeCartItem`
import "./index.css"; // Custom styles

interface CartClassroomCardProps {
  classroomId: number;
  eventId: number;
  name: string;
  address: string;
  photoUrl?: string; // URL фотографии
  onDelete: (classroomId: number) => void; // Проп для удаления
}

const CartClassroomCard = ({
  classroomId,
  eventId,
  name,
  address,
  photoUrl,
  onDelete,
}: CartClassroomCardProps) => {
  const dispatch = useDispatch();
  const cartCount = useSelector((state: any) => state.classrooms_count.classroomsCount);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const classroomIdStr = String(classroomId);
      const eventIdStr = String(eventId);

      // Отправляем запрос на сервер для удаления
      const response = await api.events.eventsDeleteClassroomDelete(eventIdStr, classroomIdStr);

      if (response.status === 200 || response.status === 204) {
        setError(null); // Сбрасываем ошибки

        // Уменьшаем счетчик корзины в Redux
        dispatch(setCartCount(cartCount - 1));

        // Удаляем аудиторию из глобального состояния Redux
        dispatch(removeCartItem(classroomId!));

        // Удаляем карточку из локального состояния
        onDelete(classroomId);
      } else {
        setError("Ошибка при удалении аудитории из корзины.");
      }
    } catch (err) {
      console.error("Ошибка при удалении аудитории:", err);
      setError("Ошибка при удалении аудитории из корзины.");
    }
  };

  return (
    <Card className="cart-card">
      <CardBody className="cart-card-body d-flex align-items-center">
        {/* Фото слева */}
        {photoUrl && (
          <img
            src={photoUrl}
            alt={`Фотография аудитории ${name}`}
            className="cart-card-image"
          />
        )}
        {/* Контент карточки */}
        <div className="cart-card-content">
          <CardTitle tag="h5" className="cart-card-title">
            {name}
          </CardTitle>
          <CardText className="cart-card-text">{address}</CardText>
        </div>
        {/* Кнопка удаления */}
        <Button color="danger" className="cart-delete-button" onClick={handleDelete}>
          Удалить
        </Button>
      </CardBody>

      {error && <div className="error-message">{error}</div>}
    </Card>
  );
};

export default CartClassroomCard;
