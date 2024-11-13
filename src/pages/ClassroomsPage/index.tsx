import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { T_Classroom } from "src/modules/types.ts";
import ClassroomCard from "components/ClassroomCard";
import { ClassroomMocks } from "src/modules/mocks.ts";
import { FormEvent, useEffect } from "react";
import * as React from "react";
import './index.css'; // Импортируем стили

type ClassroomsPageProps = {
    classrooms: T_Classroom[],
    setClassrooms: React.Dispatch<React.SetStateAction<T_Classroom[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    classroomName: string,
    setClassroomName: React.Dispatch<React.SetStateAction<string>>
}

const ClassroomsPage = ({ classrooms, setClassrooms, isMock, setIsMock, classroomName, setClassroomName }: ClassroomsPageProps) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/classrooms/search?name=${classroomName}`, { signal: AbortSignal.timeout(1000) });
            const data = await response.json();
            setClassrooms(data.classrooms);
            setIsMock(false);
        } catch {
            createMocks();
        }
    }

    const createMocks = () => {
        setIsMock(true);
        setClassrooms(ClassroomMocks.filter(classroom => classroom.name.toLowerCase().includes(classroomName.toLowerCase())));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isMock) {
            createMocks();
        } else {
            await fetchData();
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container className="container-custom">
            <Row className="justify-content-center mb-5"> {/* Центрируем ряд */}
                <Col xs="12" md="8" lg="6"> {/* Центрируем содержимое и ограничиваем ширину */}
                    <Form onSubmit={handleSubmit} className="d-flex">
                        <Input
                            value={classroomName}
                            onChange={(e) => setClassroomName(e.target.value)}
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