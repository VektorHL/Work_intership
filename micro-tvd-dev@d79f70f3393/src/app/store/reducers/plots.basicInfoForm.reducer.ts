import { createReducer, Action, on } from '@ngrx/store';
import { initialPlotsState, IPlotsBasicInfoFormState } from '../state/plots.basicInfoForm.state';
import * as PlotsActions from '../actions/plots.basicInfoForm.actions';

const reducer = createReducer(
  initialPlotsState,
  on(PlotsActions.setCreateMode, (state, { createMode }) => ({
    ...state,
    createMode,
  })),
  on(PlotsActions.setEditMode, (state, { editMode }) => ({
    ...state,
    editMode,
  })),
  on(PlotsActions.setFormChanged, (state, { formChanged }) => ({
    ...state,
    formChanged,
  })),
  on(PlotsActions.setResetFormState, (state, { resetForm }) => ({
    ...state,
    resetForm,
  })),
  on(PlotsActions.setSaveFormState, (state, { saveForm }) => ({
    ...state,
    saveForm,
  })),
  on(PlotsActions.setHideButtonsState, (state, { hide }) => ({
    ...state,
    hide,
  })),
);

export function basicInfoFormReducer(state: IPlotsBasicInfoFormState | undefined, action: Action) {
  return reducer(state, action);
}
