import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {T_Classroom} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {ClassroomMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";

type ClassroomPageProps = {
    selectedClassroom: T_Classroom | null,
    setSelectedClassroom: React.Dispatch<React.SetStateAction<T_Classroom | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ClassroomPage = ({selectedClassroom, setSelectedClassroom, isMock, setIsMock}: ClassroomPageProps) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/classrooms/${id}`,{ signal: AbortSignal.timeout(1000) })
            const data = await response.json()
            setSelectedClassroom(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedClassroom(ClassroomMocks.find(Classroom => Classroom?.classroom_id == parseInt(id as string)) as T_Classroom)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedClassroom(null)
    }, []);

    if (!selectedClassroom) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={isMock ? mockImage as string : selectedClassroom.url}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedClassroom.name}</h1>
                    <p className="fs-5">Описание:</p>
                    {selectedClassroom.description.split("t").map((desc, index) => (
                    <li key={index} className="fs-5">{desc}</li>
                    ))}
                    <p className="fs-5">Адрес: {selectedClassroom.address}.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ClassroomPage