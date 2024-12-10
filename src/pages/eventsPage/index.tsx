import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Input, Form, FormGroup, Label } from "reactstrap";
import { api } from "src/api"; // Ваши API-запросы
import "./index.css";

interface Event {
  id: number;
  status: string;
  created_at: string;
  formed_at: string;
  completed_at: string;
  number: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); // Список мероприятий
  const [statusFilter, setStatusFilter] = useState<string>("0"); // Фильтр по статусу
  const [dateStart, setDateStart] = useState<string>(""); // Фильтр начала даты
  const [dateEnd, setDateEnd] = useState<string>(""); // Фильтр конца даты
  const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибок

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.events.eventsSearchList({
        status: statusFilter,
        date_formation_start: dateStart,
        date_formation_end: dateEnd,
      });

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

  // Загрузка данных при изменении фильтров
  useEffect(() => {
    fetchEvents();
  }, [statusFilter, dateStart, dateEnd]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents();
  };

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
              <th>Номер</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.status}</td>
                <td>{new Date(event.created_at).toLocaleString()}</td>
                <td>{new Date(event.formed_at).toLocaleString()}</td>
                <td>{event.completed_at ? new Date(event.completed_at).toLocaleString() : "-"}</td>
                <td>{event.number}</td>
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
