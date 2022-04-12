import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IPlotsBasicInfoFormState } from '../state/plots.basicInfoForm.state';

const formState = (state: IAppState) => state.plots.basicInfoForm;

export const createModeFormSelector = createSelector(formState, (state: IPlotsBasicInfoFormState) => state.createMode);

export const editModeFormSelector = createSelector(formState, (state: IPlotsBasicInfoFormState) => state.editMode);

export const formChangedSelector = createSelector(formState, (state: IPlotsBasicInfoFormState) => state.formChanged);

export const resetFormSelector = createSelector(formState, (state: IPlotsBasicInfoFormState) => state.resetForm);

export const saveFormSelector = createSelector(formState, (state: IPlotsBasicInfoFormState) => state.saveForm);

export const hideButtonsSelector = createSelector(formState, (state: IPlotsBasicInfoFormState) => state.hide);
