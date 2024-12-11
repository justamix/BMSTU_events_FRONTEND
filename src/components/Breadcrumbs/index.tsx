
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Classroom} from "modules/types.ts";
import {isHomePage, isClassroomPage, isDraftEventPage, isProfilePage, isMyEventsPage, isEditPage} from "utils/utils.ts";

interface BreadcrumbsProps {
    currentClassroom: T_Classroom | null
}

const Breadcrumbs = ({ currentClassroom }: BreadcrumbsProps) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{isHomePage(location.pathname) &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/classrooms") &&
                <BreadcrumbItem active>
                    <Link to="/classrooms">
						Аудитории
                    </Link>
                </BreadcrumbItem>
			}
            {isClassroomPage(location.pathname) &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { currentClassroom?.name }
                    </Link>
                </BreadcrumbItem>
            }
            {isMyEventsPage(location.pathname) &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        Мои мероприятия
                    </Link>
                </BreadcrumbItem>
            }
            {isProfilePage(location.pathname) &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        Личный кабинет
                    </Link>
                </BreadcrumbItem>
            }
            {isDraftEventPage(location.pathname) &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        Текущее мероприятие
                    </Link>
                </BreadcrumbItem>
            }
            {isEditPage(location.pathname) && (
                <>
                <BreadcrumbItem>
                    <Link to="/profile">Личный кабинет</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                <Link to={location.pathname}>Редактирование</Link>
                </BreadcrumbItem>
                </>
            )}
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs
