import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { T_Classroom } from "src/modules/types.ts";
import ClassroomCard from "components/ClassroomCard";
import { FormEvent, useEffect, useState } from "react";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { setClassroomName } from "src/searchSlice";
import { api } from "src/api"; // Ваш API
import './index.css'; 
import { setCartCount, setDraftId, setCartItems } from "src/slices/cartSlice";

type ClassroomsPageProps = {};
interface CartClassroom {
    classroom_id: number;
    name: string;
    address: string;
  }
const ClassroomsPage: React.FC<ClassroomsPageProps> = () => {
    const classroomName = useSelector((state: RootState) => state.search.classroomName); // Получаем состояние из Redux
    const dispatch = useDispatch();

    const [classrooms, setClassrooms] = useState<T_Classroom[]>([]); // Локальное состояние для списка аудиторий
    const [isMock, setIsMock] = useState(false); // Флаг для использования моков
    const [loading, setLoading] = useState(false); // Флаг загрузки
    const [error, setError] = useState<string | null>(null); // Ошибка
    // Функция для загрузки данных из API
    const fetchData = async () => {
        setLoading(true);
        setError(null); // Сброс ошибок
        try {
            const response = await api.classrooms.classroomsSearchList({ name: classroomName }); // Вызов API
            console.log("Ответ API:", response.data);
            setCartItems(response.data.draft_classrooms || []); // Устанавливаем аудитории
            setClassrooms(response.data.classrooms); // Устанавливаем данные
            setIsMock(false);
            const draftCount = response.data.classrooms_count || 0; 
            const draftId = response.data.draft_event || null;
            const draft_classrooms = response.data.draft_classrooms || [];
            console.log("eventId из Redux:", draftId);
            dispatch(setCartCount(draftCount));
            dispatch(setDraftId(draftId))  
            dispatch(setCartItems(draft_classrooms));
        } catch (err) {
            console.error("Ошибка при загрузке аудиторий:", err);
            setError("Не удалось загрузить данные");
            setIsMock(true);
        } finally {
            setLoading(false);
        }
    };

    // Обработчик отправки формы поиска
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await fetchData();
    };

    // Эффект для начальной загрузки
    useEffect(() => {
        fetchData();
    }, []); // Загрузка при монтировании компонента

    return (
        <Container className="container-custom">
            {/* Форма поиска */}
            <Row className="justify-content-center mb-5">
                <Col xs="12" md="8" lg="6">
                    <Form onSubmit={handleSubmit} className="d-flex">
                        <Input
                            value={classroomName}
                            onChange={(e) => dispatch(setClassroomName(e.target.value))} // Обновляем состояние в Redux
                            placeholder="Поиск..."
                            className="me-2 search-input"
                        />
                        <Button color="primary" className="search-button" disabled={loading}>
                            {loading ? "Поиск..." : "Поиск"}
                        </Button>
                    </Form>
                </Col>
            </Row>
    
            {/* Ошибка */}
            {error && <div className="error-message">{error}</div>}

            {/* Карточки */}
            <Row className="card-grid">
                {classrooms?.map((classroom) => (
                    <Col key={classroom.classroom_id} className="classroom-card-col">
                        <ClassroomCard classroom={classroom} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ClassroomsPage;
