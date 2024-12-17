import { useEffect, useState } from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import ClassroomPage from "pages/ClassroomPage";
import ClassroomsPage from "pages/ClassroomsPage";
import LoginPage from "./pages/loginPage";
import { Route, Routes} from "react-router-dom";
import { T_Classroom } from "src/modules/types.ts";
import { Container, Row } from "reactstrap";
import HomePage from "pages/HomePage";
import EditUserPage from "./pages/profilePage/index1";
import "./App.css"; // Импорт вашего CSS
// import AuthPage from "./pages/authPage";
import RegisterPage from "./pages/regPage";
import EditProfile from "./pages/profilePage";
import CartPage from "./pages/Cart";
import EventsPage from "./pages/eventsPage";
import { invoke as tauriInvoke } from "@tauri-apps/api/core";

function App() {
    const [currentClassroom, setSelectedClassroom] = useState<T_Classroom | null>(null);
    const [isMock, setIsMock] = useState(false);
    useEffect(() => {
        tauriInvoke('tauri', {cmd: 'create'})
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));

    return () => {
        tauriInvoke('tauri', {cmd: 'close'})
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));
    }
    }, []);
    return (
        <div className="wrapper">
            {<Header />}
            <main className="main-content">
                <Container className="pt-4">
                    <Row className="mb-3">
                        <Breadcrumbs currentClassroom={currentClassroom} />
                    </Row>
                    <Row>
                        <Routes>
                            <Route
                                path="/"
                                element={< HomePage />}
                            />
                            <Route
                                path="/classrooms/"
                                element={< ClassroomsPage />}
                            />
                            <Route
                                path="/classrooms/:id"
                                element={<ClassroomPage
                                    selectedClassroom={currentClassroom}
                                    setSelectedClassroom={setSelectedClassroom}
                                    isMock={isMock}
                                    setIsMock={setIsMock}
                                />}
                            />
                            <Route 
                                path="/register" 
                                element={<RegisterPage />} 
                            />
                            <Route 
                                path="/login" 
                                element={<LoginPage />} 
                            />
                            <Route 
                                path="/profile" 
                                element={<EditProfile />} 
                            />
                            <Route 
                                path="/users/:userId/edit" 
                                element={<EditUserPage />} 
                            />
                            <Route 
                                path="/draft_event" 
                                element={< CartPage />} 
                            />
                            <Route 
                                path="/my_events" 
                                element={< EventsPage />} 
                            />
                        </Routes>
                        
                    </Row>
                </Container>
            </main>
        </div>
    );
}

export default App;
