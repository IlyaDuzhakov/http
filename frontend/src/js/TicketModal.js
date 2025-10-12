export default class TicketModal {
  constructor({ title = 'Новый тикет', defaultName = '', defaultDescription = '', onSubmit }) {
    this.title = title;
    this.defaultName = defaultName;
    this.defaultDescription = defaultDescription;
    this.onSubmit = onSubmit;
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
            <input type="text" name="name" required>
          </label>
          <label>
            Подробное описание
            <textarea name="description"></textarea>
          </label>
          <div class="modal-buttons">
            <button type="button" class="btn-cancel">Отмена</button>
            <button type="submit" class="btn-ok">Ок</button>
          </div>
        </form>
      </div>
    `;

    document.body.append(this.modal);

    // Проставим значения по умолчанию
    const nameInput = this.modal.querySelector('input[name="name"]');
    const descInput = this.modal.querySelector('textarea[name="description"]');
    nameInput.value = this.defaultName;
    descInput.value = this.defaultDescription;

    // Слушатели
    this.modal.querySelector('.btn-cancel').addEventListener('click', () => this.close());
    this.modal.querySelector('.modal-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const description = descInput.value.trim();
      this.onSubmit(name, description);
      this.close();
    });
  }

  close() {
    this.modal.remove();
  }
}
