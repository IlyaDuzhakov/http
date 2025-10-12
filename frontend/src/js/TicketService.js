/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  list(callback) {
    fetch('http://localhost:7070/?method=allTickets')
      .then((response) => response.json())
      .then((data) => {
        callback(data); // вызываем функцию и передаём туда массив тикетов
      })
      .catch((error) => {
        console.error('Ошибка загрузки тикетов:', error);
      });
  }

  get(id, callback) {
    fetch(`http://localhost:7070/?method=ticketById&id=${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка получения тикета');
        return response.json();
      })
      .then((ticketData) => {
        callback(ticketData);
      })
      .catch((error) => {
        console.error('Ошибка при получении тикета:', error);
      });
  }

  create(data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:7070/?method=createTicket');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          callback(response); // вернём объект нового тикета
        } catch (e) {
          console.error('Ошибка парсинга ответа:', e);
        }
      } else {
        console.error('Ошибка при создании тикета:', xhr.status);
      }
    });

    xhr.send(JSON.stringify(data));
  }

  update(id, data, callback) {
    fetch(`http://localhost:7070/?method=updateById&id=${id}`, {
      method: 'POST', // сервер принимает POST, не PATCH
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при обновлении тикета');
        }
        return response.json();
      })
      .then((updatedTicket) => {
        if (callback) callback(updatedTicket);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении:', error);
      });
  }

  delete(id, callback) {
    fetch(`http://localhost:7070?method=deleteById&id=${id}`, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка удаления');
        return response.text();
      })
      .then(() => {
        callback(); // вызывает перерисовку
      })
      .catch((err) => console.error('Ошибка при удалении тикета:', err));
  }
}
