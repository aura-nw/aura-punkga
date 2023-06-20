import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { configKeplr, KeplrConfig } from 'core/logic';
import { Config } from 'helpers';
import {
  FAVORITE_TOKENS,
  LAST_USED_THEME,
  MAXIMUM_FAVORITE_TOKENS,
  Themes
} from '../constants/constants';
import { getLocalStorage, setLocalStorage } from '../helpers/localStorage';

const initialState: CommonState = {
  lang: 'en',
  theme: getLocalStorage<Themes>(LAST_USED_THEME) || Themes.DARK,
  toggleMobileMenu: false,
  showConnectWalletModal: false,
  chainConfig: undefined,
  isAuraConfig: true,
  favoriteTokens: getLocalStorage<string[]>(FAVORITE_TOKENS) || []
};
const { reducer, actions } = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeTheme: (state) => {
      const newTheme = state.theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;
      setLocalStorage(LAST_USED_THEME, newTheme);
      state.theme = newTheme;
    },
    setTheme: (state, action: PayloadAction<Themes>) => {
      state.theme = action.payload;
    },
    toggleMenuMobile: (state) => {
      state.toggleMobileMenu = !state.toggleMobileMenu;
    },
    addFavoriteToken: (state, action: PayloadAction<string>) => {
      if (state.favoriteTokens.length >= MAXIMUM_FAVORITE_TOKENS) return;

      state.favoriteTokens.push(action.payload);
      setLocalStorage(FAVORITE_TOKENS, state.favoriteTokens);
    },
    removeFavoriteToken: (state, action: PayloadAction<string>) => {
      const tokenIndex = state.favoriteTokens.indexOf(action.payload);
      if (tokenIndex > -1) {
        state.favoriteTokens.splice(tokenIndex, 1);
        setLocalStorage(FAVORITE_TOKENS, state.favoriteTokens);
      }
    },
    showConnectWalletModal: (
      state,
      action: PayloadAction<{ open: boolean; chainConfig?: KeplrConfig }>
    ) => {
      const { open, chainConfig } = action.payload;
      const config = chainConfig || configKeplr(Config.chainInfo);
      const isAuraConfig = !chainConfig;

      return {
        ...state,
        showConnectWalletModal: open,
        chainConfig: config,
        isAuraConfig
      };
    }
  },
  extraReducers: () => {}
});

export { reducer, actions as commonActions };
