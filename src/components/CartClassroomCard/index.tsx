import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteClassroomFromCart } from "src/thunks/cartThunks";
import { AppDispatch } from "src/store";
import "./index.css";

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
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteClassroomFromCart({ eventId, classroomId }))
      .unwrap()
      .then(() => onDelete(classroomId))
      .catch((err) => console.error(err));
  };

  return (
    <Card className="cart-card">
      <CardBody className="cart-card-body d-flex align-items-center">
        {photoUrl && <img src={photoUrl} alt={name} className="cart-card-image" />}
        <div className="cart-card-content">
          <CardTitle tag="h5">{name}</CardTitle>
          <CardText>{address}</CardText>
        </div>
        <Button color="danger" onClick={handleDelete}>
          Удалить
        </Button>
      </CardBody>
    </Card>
  );
};

export default CartClassroomCard;
