import { createAction, props } from '@ngrx/store';
import { EPlotsActionTypes } from '../action-types/plots';

export const setEditMode = createAction(EPlotsActionTypes.PLOTS_EDIT, props<{ editMode: boolean }>());

export const setCreateMode = createAction(EPlotsActionTypes.PLOTS_CREATE, props<{ createMode: boolean }>());

export const setFormChanged = createAction(EPlotsActionTypes.PLOTS_FORM_CHANGED, props<{ formChanged: boolean }>());

export const setResetFormState = createAction(EPlotsActionTypes.PLOTS_RESET_FORM, props<{ resetForm: boolean }>());

export const setSaveFormState = createAction(EPlotsActionTypes.PLOTS_SAVE_FORM, props<{ saveForm: boolean }>());

export const setHideButtonsState = createAction(EPlotsActionTypes.PLOTS_HIDE_BUTTONS, props<{ hide: boolean }>());
