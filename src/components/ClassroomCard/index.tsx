import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import mockImage from "assets/mock.png";
import { Link } from "react-router-dom";
import { T_Classroom } from "modules/types.ts";
import './index.css';

interface ClassroomCardProps {
    classroom: T_Classroom,
    isMock: boolean
}

const ClassroomCard = ({ classroom, isMock }: ClassroomCardProps) => {
    return (
        <Card className="card-custom">
            <div className="card-img-wrapper">
                <CardImg src={isMock ? mockImage as string : classroom.url} className="card-img-custom"/>
            </div>
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5" className="card-title-custom"> {classroom.name} </CardTitle>
                <CardText className="card-text-custom"> {classroom.address} </CardText>
                <Link to={`/classrooms/${classroom.classroom_id}`}>
                    <Button className="button-custom">
                    Подробнее
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default ClassroomCard;