import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import mockImage from "assets/mock.png";
import Breadcrumbs from "components/Breadcrumbs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store";
import { fetchClassroomById } from "src/thunks/classroomThunk";
import { T_Classroom } from "src/modules/types";

interface ClassroomPageProps {
  selectedClassroom: T_Classroom | null;
  setSelectedClassroom: React.Dispatch<React.SetStateAction<T_Classroom | null>>;
}

const ClassroomPage: React.FC<ClassroomPageProps> = ({ selectedClassroom, setSelectedClassroom }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadClassroom = async () => {
      if (id) {
        const result = await dispatch(fetchClassroomById(id));
        if (fetchClassroomById.fulfilled.match(result)) {
          setSelectedClassroom(result.payload);
        }
      }
    };

    loadClassroom();
    return () => setSelectedClassroom(null); // Очищаем состояние при размонтировании
  }, [id, dispatch, setSelectedClassroom]);

  return (
    <Container>
      <Row>
        <Col md="6">
          <img
            alt=""
            src={selectedClassroom?.url || mockImage}
            className="w-100"
          />
        </Col>
        <Col md="6">
          <h1 className="mb-3">{selectedClassroom?.name || "Загрузка..."}</h1>
          <p className="fs-5">Описание:</p>
          {selectedClassroom?.description
            ?.split("t")
            .map((desc: string, index: number) => (
              <li key={index} className="fs-5">
                {desc}
              </li>
            ))}
          <p className="fs-5">Адрес: {selectedClassroom?.address || "N/A"}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ClassroomPage;
