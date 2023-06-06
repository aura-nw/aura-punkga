import { createSelector } from 'reselect';
import { Themes } from '../constants/constants';
import { AppState } from '../storeConfig';

export const selectCurrentTheme = createSelector(
  (state: AppState) => state.common.theme,
  (data: Themes) => data
);
