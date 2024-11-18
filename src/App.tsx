import { useState } from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import ClassroomPage from "pages/ClassroomPage";
import ClassroomsPage from "pages/ClassroomsPage";
import { Route, Routes } from "react-router-dom";
import { T_Classroom } from "src/modules/types.ts";
import { Container, Row } from "reactstrap";
import HomePage from "pages/HomePage";
import "./App.css"; // Импорт вашего CSS

function App() {
    const [classrooms, setClassrooms] = useState<T_Classroom[]>([]);
    const [currentClassroom, setSelectedClassroom] = useState<T_Classroom | null>(null);
    const [isMock, setIsMock] = useState(false);

    return (
        <div className="wrapper">
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs currentClassroom={currentClassroom} />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/classrooms/" element={<ClassroomsPage classrooms={classrooms} setClassrooms={setClassrooms} isMock={isMock} setIsMock={setIsMock}/>} />
                        <Route path="/classrooms/:id" element={<ClassroomPage selectedClassroom={currentClassroom} setSelectedClassroom={setSelectedClassroom} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                </Row>
            </Container>
        </div>
    );
}

export default App;