import React, { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { api } from "src/api"; // Ваши API-запросы
import { parseISO, format } from "date-fns"; // Импортируем нужные функции из date-fns
import "./index.css";

interface Event {
  id: number;
  status: string;
  created_at: string;
  submitted_at: string;
  completed_at: string | null;
  classrooms: Array<any>; // Массив аудиторий
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); // Список мероприятий
  const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибок

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.events.eventsSearchList();

      if (response.status === 200) {
        setEvents(response.data);
      } else {
        setError("Ошибка при загрузке мероприятий");
      }
    } catch (err) {
      console.error("Ошибка при загрузке мероприятий:", err);
      setError("Ошибка при загрузке мероприятий");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
                <td>{event.classrooms.length}</td> {/* Используем длину массива classrooms */}
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
