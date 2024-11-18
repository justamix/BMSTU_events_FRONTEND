import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { T_Classroom } from "src/modules/types.ts";
import ClassroomCard from "components/ClassroomCard";
import { ClassroomMocks } from "src/modules/mocks.ts";
import { FormEvent, useEffect } from "react";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store"; // Убедитесь, что путь правильный
import { setClassroomName } from "src/searchSlice"; // Импорт действия из searchSlice
import './index.css'; // Импортируем стили

type ClassroomsPageProps = {
    classrooms: T_Classroom[],
    setClassrooms: React.Dispatch<React.SetStateAction<T_Classroom[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ClassroomsPage = ({ classrooms, setClassrooms, isMock, setIsMock }: ClassroomsPageProps) => {
    const classroomName = useSelector((state: RootState) => state.search.classroomName); // Получаем состояние из Redux
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/classrooms/search?name=${classroomName}`, { signal: AbortSignal.timeout(1000) });
            const data = await response.json();
            setClassrooms(data.classrooms);
            setIsMock(false);
        } catch {
            createMocks();
        }
    };

    const createMocks = () => {
        setIsMock(true);
        setClassrooms(ClassroomMocks.filter(classroom => classroom.name.toLowerCase().includes(classroomName.toLowerCase())));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isMock) {
            createMocks();
        } else {
            await fetchData();
        }
    };

    useEffect(() => {
        fetchData();
    }, [classroomName]); // Перезапуск при изменении classroomName

    return (
        <Container className="container-custom">
            <Row className="justify-content-center mb-5"> {/* Центрируем ряд */}
                <Col xs="12" md="8" lg="6"> {/* Центрируем содержимое и ограничиваем ширину */}
                    <Form onSubmit={handleSubmit} className="d-flex">
                        <Input
                            value={classroomName}
                            onChange={(e) => dispatch(setClassroomName(e.target.value))} // Обновляем состояние в Redux
                            placeholder="Поиск..."
                            className="me-2 search-input"
                        />
                        <Button color="primary" className="search-button">
                            Поиск
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {classrooms?.map((classroom) => (
                    <Col key={classroom.classroom_id} xs="12" sm="6" md="4" className="classroom-card-col">
                        <ClassroomCard classroom={classroom} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ClassroomsPage;