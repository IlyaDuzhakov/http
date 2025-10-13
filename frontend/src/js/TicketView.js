/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(tickets) {
    this.htmls = [];
    this.tickets = tickets;
  }

  renderTickets() {
    for (const el of this.tickets) {
      const html = `
  <div class="ticket" data-id="${el.id}">
  
  <div class="ticket-body">
  <input type="checkbox" class="ticket-status" ${el.status ? 'checked' : ''}>
  <span class="ticket-title">${el.name}</span>
  </div>
  <span class="ticket-date">${new Date(el.created).toLocaleString()}</span>
  <div class="ticket-description" style="display: none;">${el.description}</div>
    

  <div class="ticket-actions">
    <button class="btn btn-edit">✎</button>
    <button class="btn btn-delete">×</button>
  </div>
</div>

`;
      // ${el.created}

      this.htmls.push(html);
      // const root = document.querySelector("#root")
      // root.insertAdjacentHTML("beforeend", html)
    }
    return this.htmls.join('');
    //  return htmls
  }
}
