import { createSlice } from '@reduxjs/toolkit';
import { Themes } from '../constants/constants';

const initialState: CommonState = {
  lang: 'en',
  theme: Themes.DARK
};
const { reducer, actions } = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;
    }
  },
  extraReducers: (builder) => {}
});

export { reducer, actions as commonActions };
