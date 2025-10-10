/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(tickets) {
    this.htmls = []
    this.tickets = tickets;
  }
  renderTickets() {
    for (let el of tickets) {
      const html = `
      <div class="tiket">
      <input type="checkbox">
      <p class="text">${el.name}</p>
      <p class="data">${el.created}</p>
      <div class="btn-wrapper">
        <button class="btn-edit">+</button>
        <button class="btn-delete">&times</button>
      </div>
    </div>
    `
    this.htmls.push(html)
    // const root = document.querySelector("#root")
    // root.insertAdjacentHTML("beforeend", html)
  }
  return htmls
  }
}

