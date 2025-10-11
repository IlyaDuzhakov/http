export default class TicketModal {
  constructor({ title = 'Новый тикет', name = '', description = '', onSubmit }) {
    this.title = title;
    this.name = name;
    this.description = description;
    this.onSubmit = onSubmit; // функция, которую вызываем при нажатии "Ок"
  }

  render() {
    // Создаём контейнер модалки
    this.modal = document.createElement('div');
    this.modal.classList.add('modal-overlay');
    this.modal.innerHTML = `
      <div class="modal">
        <h2 class="modal-title">${this.title}</h2>
        <form class="modal-form">
          <label>
            Краткое описание
            <input type="text" name="name" value="${this.name}" required>
          </label>
          <label>
            Подробное описание
            <textarea name="description">${this.description}</textarea>
          </label>
          <div class="modal-buttons">
            <button type="button" class="btn-cancel">Отмена</button>
            <button type="submit" class="btn-ok">Ок</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(this.modal);

    // Слушатели
    this.modal.querySelector('.btn-cancel').addEventListener('click', () => this.close());
    this.modal.querySelector('.modal-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = this.modal.querySelector('input[name="name"]').value.trim();
      const description = this.modal.querySelector('textarea[name="description"]').value.trim();
      this.onSubmit(name, description);
      this.close();
    });
  }

  close() {
    this.modal.remove();
  }
}
