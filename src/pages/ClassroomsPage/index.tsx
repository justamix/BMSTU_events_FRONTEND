import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import ClassroomCard from "components/ClassroomCard";
import { FormEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "src/store";
import { setClassroomName } from "src/searchSlice";
import { fetchClassrooms } from "src/thunks/classroomsThunk";
import { changeColor } from "src/slices/userSlice";
import "./index.css";

const ClassroomsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const classroomName = useSelector((state: RootState) => state.search.classroomName);
  const { classrooms, loading, error } = useSelector((state: RootState) => state.classrooms_count);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchClassrooms(classroomName)); // Вызываем Thunk
    dispatch(changeColor());
  };

  useEffect(() => {
    dispatch(fetchClassrooms("")); // Загружаем все аудитории при монтировании
  }, [dispatch]);

  return (
    <Container className="container-custom">
      <Row className="justify-content-center mb-5">
        <Col xs="12" md="8" lg="6">
          <Form onSubmit={handleSubmit} className="d-flex">
            <Input
              value={classroomName}
              onChange={(e) => dispatch(setClassroomName(e.target.value))}
              placeholder="Поиск..."
              className="me-2 search-input"
            />
            <Button color="primary" className="search-button" disabled={loading}>
              {loading ? "Поиск..." : "Поиск"}
            </Button>
          </Form>
        </Col>
      </Row>

      {error && <div className="error-message">{error}</div>}

      <Row className="card-grid">
        {classrooms?.map((classroom) => (
          <Col key={classroom.classroom_id} className="classroom-card-col">
            <ClassroomCard classroom={classroom} isMock={false} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ClassroomsPage;
