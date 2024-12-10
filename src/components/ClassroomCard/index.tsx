import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import mockImage from "assets/mock.png";
import { Link } from "react-router-dom";
import { T_Classroom } from "modules/types.ts";
import { useSelector, useDispatch } from "react-redux";
import { api } from "src/api"; // Ваши API запросы
import { useState } from "react";
import './index.css';
import { setCartCount, setDraftId, setCartItems } from "slices/cartSlice";
interface ClassroomCardProps {
    classroom: T_Classroom;
    isMock: boolean;
}

const ClassroomCard = ({ classroom, isMock }: ClassroomCardProps) => {
    const sessionId = useSelector((state: any) => state.cookie.cookie); // Получаем session_id из Redux
    const currentCartCount = useSelector((state: any) => state.classrooms_count.classroomsCount);
    const currentCartItems = useSelector((state: any) => state.classrooms_count.cartItems); // Текущее состояние корзины
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleAddToCart = async (classroomId: number) => {
        if (!sessionId) {
            setError("Вы не авторизованы!");
            return;
        }

        try {
            const classroomIdStr = String(classroomId);
            const response = await api.classrooms.classroomsAddToEventCreate(classroomIdStr, sessionId);

            if (response.status === 200) {
                setError(null);
                dispatch(setCartCount(currentCartCount + 1));
                const draftId = response.data.app_id;
                dispatch(setDraftId(draftId));

                const newCartItem = {
                    classroom_id: classroom.classroom_id,
                    name: classroom.name,
                    address: classroom.address,
                    url: classroom.url
                };
                dispatch(setCartItems([...currentCartItems, newCartItem]));
                setSuccessMessage("Аудитория успешно добавлена в корзину.");
            } else {
                setError("Ошибка при добавлении аудитории в корзину.");
                setSuccessMessage(null);
            }
        } catch (err) {
            console.error("Ошибка при добавлении аудитории:", err);
            setError("Ошибка при добавлении аудитории в корзину.");
            setSuccessMessage(null);
        }
    };

    return (
        <Card className="card-custom">
            <div className="card-img-wrapper">
                <CardImg src={isMock ? mockImage : classroom.url} className="card-img-custom" />
            </div>
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5" className="card-title-custom">{classroom.name}</CardTitle>
                <CardText className="card-text-custom">{classroom.address}</CardText>

                <Link to={`/classrooms/${classroom.classroom_id}`}>
                    <Button className="button-custom">
                        Подробнее
                    </Button>
                </Link>

                {sessionId && (
                    <Button
                        className="add-to-cart-button"
                        onClick={() => handleAddToCart(classroom.classroom_id)}
                    >
                        Добавить в корзину
                    </Button>
                )}

                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
            </CardBody>
        </Card>
    );
};

export default ClassroomCard;