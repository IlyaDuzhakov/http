import TicketView from "./TicketView";

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
  }

  init() {
    const show = new TicketView() 
    console.log(show)
  }
}
