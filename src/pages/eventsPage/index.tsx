import React, { useEffect, useState } from "react";
import { Container, Table, Form, Input, Button, Row, Col, Label } from "reactstrap";
import { parseISO, format } from "date-fns";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store";
import { fetchEvents } from "src/thunks/eventThunks";
import "./index.css";

interface Event {
  id: number;
  status: number; // Числовое значение статуса
  created_at: string;
  submitted_at: string;
  completed_at: string | null;
  event_name: string;
  classrooms: Array<any>;
}

// Сопоставление числовых статусов с их строковыми отображениями
const statusMapping: Record<number, string> = {
  1: "создано",
  2: "отправлено",
  3: "завершено",
};

const EventsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Фильтры
  const [statusFilter, setStatusFilter] = useState<string>(""); // Фильтр по статусу
  const [dateFrom, setDateFrom] = useState<string>(""); // Начальная дата
  const [dateTo, setDateTo] = useState<string>(""); // Конечная дата

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const resultAction = await dispatch(fetchEvents());
        if (fetchEvents.fulfilled.match(resultAction)) {
          setEvents(resultAction.payload);
          setFilteredEvents(resultAction.payload);
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

  // Фильтрация событий
  useEffect(() => {
    let filtered = events;

    // Фильтрация по статусу
    if (statusFilter) {
      filtered = filtered.filter(
        (event) =>
          statusMapping[event.status]?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Фильтрация по диапазону дат
    if (dateFrom) {
      filtered = filtered.filter(
        (event) => new Date(event.created_at) >= new Date(dateFrom)
      );
    }
    if (dateTo) {
      filtered = filtered.filter(
        (event) => new Date(event.created_at) <= new Date(dateTo)
      );
    }

    setFilteredEvents(filtered);
  }, [statusFilter, dateFrom, dateTo, events]);

  return (
    <Container>
      <h1 className="events-title">Мероприятия</h1>

      {loading && <p>Загрузка...</p>}
      {error && <div className="error-message">{error}</div>}

      {/* Форма фильтрации */}
      <Form className="mb-4">
        <Row>
          <Col md="4">
            <Label for="statusFilter">Фильтр по статусу</Label>
            <Input
              id="statusFilter"
              type="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Все</option>
              <option value="создано">создано</option>
              <option value="отправлено">отправлено</option>
              <option value="завершено">завершено</option>
            </Input>
          </Col>
          <Col md="3">
            <Label for="dateFrom">Дата от</Label>
            <Input
              id="dateFrom"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Col>
          <Col md="3">
            <Label for="dateTo">Дата до</Label>
            <Input
              id="dateTo"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Col>
          <Col md="2" className="d-flex align-items-end">
            <Button
              color="secondary"
              onClick={() => {
                setStatusFilter("");
                setDateFrom("");
                setDateTo("");
              }}
            >
              Сбросить фильтры
            </Button>
          </Col>
        </Row>
      </Form>

      {!loading && filteredEvents.length > 0 && (
        <Table bordered>
          <thead>
            <tr>
              <th>№</th>
              <th>Статус</th>
              <th>Название</th>
              <th>Дата создания</th>
              <th>Дата формирования</th>
              <th>Дата завершения</th>
              <th>Количество аудиторий</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{statusMapping[event.status]}</td>
                <td>{event.event_name}</td>
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

      {!loading && filteredEvents.length === 0 && (
        <p>Мероприятий не найдено.</p>
      )}
    </Container>
  );
};

export default EventsPage;
