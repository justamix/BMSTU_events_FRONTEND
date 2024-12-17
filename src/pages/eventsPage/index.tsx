import React, { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { parseISO, format } from "date-fns";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store";
import { fetchEvents } from "src/thunks/eventThunks";
import "./index.css";

interface Event {
  id: number;
  status: string;
  created_at: string;
  submitted_at: string;
  completed_at: string | null;
  classrooms: Array<any>;
}

const EventsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const resultAction = await dispatch(fetchEvents());
        if (fetchEvents.fulfilled.match(resultAction)) {
          setEvents(resultAction.payload); // Используем результат thunk локально
        } else {
          setError(resultAction.payload as string);
        }
      } catch (err) {
        console.error("Ошибка загрузки мероприятий:", err);
        setError("Ошибка при загрузке мероприятий.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [dispatch]);

  return (
    <Container>
      <h1 className="events-title">Мероприятия</h1>

      {loading && <p>Загрузка...</p>}
      {error && <div className="error-message">{error}</div>}

      {!loading && events.length > 0 && (
        <Table bordered>
          <thead>
            <tr>
              <th>№</th>
              <th>Статус</th>
              <th>Дата создания</th>
              <th>Дата формирования</th>
              <th>Дата завершения</th>
              <th>Количество аудиторий</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.status}</td>
                <td>
                  {event.created_at
                    ? format(parseISO(event.created_at), "dd.MM.yyyy HH:mm:ss")
                    : "-"}
                </td>
                <td>
                  {event.submitted_at
                    ? format(parseISO(event.submitted_at), "dd.MM.yyyy HH:mm:ss")
                    : "-"}
                </td>
                <td>
                  {event.completed_at
                    ? format(parseISO(event.completed_at), "dd.MM.yyyy HH:mm:ss")
                    : "-"}
                </td>
                <td>{event.classrooms.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {!loading && events.length === 0 && <p>Мероприятий не найдено.</p>}
    </Container>
  );
};

export default EventsPage;
