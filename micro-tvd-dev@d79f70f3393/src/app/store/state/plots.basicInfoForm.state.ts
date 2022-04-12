export interface IPlotsBasicInfoFormState {
  /**
   * Флаг режима создания
   */
  createMode: boolean;

  /**
   * Флаг режима редактирования
   */
  editMode: boolean;

  /**
   * Флаг измененой формы
   */
  formChanged: boolean;

  /**
   * Флаг нажатия сброса изменений в форме
   */
  resetForm: boolean;

  /**
   * Флаг нажатия сохранения формы
   */
  saveForm: boolean;

  /**
   * Флаг сокрытия кнопок
   */
  hide: boolean;
}

export const initialPlotsState: IPlotsBasicInfoFormState = {
  createMode: false,
  editMode: false,
  formChanged: false,
  resetForm: false,
  saveForm: false,
  hide: false,
};
