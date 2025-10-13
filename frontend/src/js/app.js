import HelpDesk from './HelpDesk';
import TicketService from './TicketService';

const root = document.getElementById('root');

const ticketService = new TicketService();
const app = new HelpDesk(root, ticketService);

app.init();

// const request = fetch('http://localhost:7070/?method=allTickets', {
//   method: 'GET',
//   headers: { 'Content-Type': 'application/json' },
// })
//   .then((responce) => responce.json())
//   .then((info) => {
//     // console.log(info);
//   }); // ? query параметр, то есть какие-то данные при запросе
