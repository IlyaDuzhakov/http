export default class DeleteConfirmModal {
  constructor({ onConfirm, onCancel }) {
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;
  }

  render() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal-overlay');
    this.modal.innerHTML = `
      <div class="modal">
        <p class="modal-text">Удалить тикет?</p>
        <div class="modal-buttons">
          <button class="btn-cancel">Отмена</button>
          <button class="btn-ok">Удалить</button>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);

    this.modal.querySelector('.btn-cancel').addEventListener('click', () => {
      this.close();
      if (this.onCancel) this.onCancel();
    });

    this.modal.querySelector('.btn-ok').addEventListener('click', () => {
      this.close();
      if (this.onConfirm) this.onConfirm();
    });
  }

  close() {
    this.modal.remove();
  }
}
