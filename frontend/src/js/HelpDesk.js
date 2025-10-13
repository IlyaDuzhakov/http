import TicketView from './TicketView';
import TicketModal from './TicketModal';
import DeleteConfirmModal from './DeleteConfirmModal';

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
  }

  init() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.list((tickets) => {
      const ticketView = new TicketView(tickets);
      const htmlList = ticketView.renderTickets();
      this.container.innerHTML = htmlList;

      // Вернём кнопку снова
      this.renderAddButton();

      // Добавим клики по названиям тикетов
      const titles = this.container.querySelectorAll('.ticket-title');
      titles.forEach((title) => {
        title.addEventListener('click', () => {
          const ticketElement = title.closest('.ticket');
          const ticketId = ticketElement.dataset.id;

          const existingDesc = ticketElement.querySelector('.ticket-description');
          if (existingDesc) {
            existingDesc.remove();
            return;
          }

          this.ticketService.get(ticketId, (ticketData) => {
            const desc = document.createElement('div');
            desc.classList.add('ticket-description');
            desc.textContent = ticketData.description;

            title.insertAdjacentElement('afterend', desc);
          });
        });
      });
      const deleteButtons = this.container.querySelectorAll('.btn-delete');
      deleteButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const ticketId = e.currentTarget.closest('.ticket').dataset.id;

          const confirmModal = new DeleteConfirmModal({
            onConfirm: () => {
              this.ticketService.delete(ticketId, () => {
                this.loadTickets(); // Перерисует тикеты
              });
            },
            onCancel: () => {
              // console.log('Удаление отменено');
            },
          });

          confirmModal.render();
        });
      });

      const editButtons = this.container.querySelectorAll('.btn-edit');
      editButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const ticketElement = btn.closest('.ticket');
          const ticketId = ticketElement.dataset.id;

          this.ticketService.get(ticketId, (ticketData) => {
            const modal = new TicketModal({
              title: 'Редактировать тикет',
              defaultName: ticketData.name,
              defaultDescription: ticketData.description,
              onSubmit: (name, description) => {
                this.ticketService.update(
                  ticketId,
                  {
                    name,
                    description,
                  },
                  () => {
                    modal.close();
                    this.loadTickets();
                  },
                );
              },
            });

            modal.render();
          });
        });
      });
    });
  }

  renderAddButton() {
    const addButton = document.createElement('button');
    addButton.textContent = 'Добавить тикет';
    addButton.classList.add('btn-add');

    addButton.addEventListener('click', () => {
      const modal = new TicketModal({
        title: 'Добавить тикет',
        onSubmit: (name, description) => {
          // console.log('Создаём тикет:', name, description);

          this.ticketService.create(
            {
              name,
              description,
              status: false,
            },
            () => {
              modal.close();
              this.loadTickets();
            },
          );
        },
      });

      modal.render();
    });

    this.container.prepend(addButton);
  }
}
