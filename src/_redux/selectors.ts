import { KeplrConfig } from 'core/logic';
import { createSelector } from 'reselect';
import { Themes } from '../constants/constants';
import { AppState } from '../storeConfig';

export const selectCurrentTheme = createSelector(
  (state: AppState) => state.common.theme,
  (data: Themes) => data
);

export const selectShowMobileMenu = createSelector(
  (state: AppState) => state.common.toggleMobileMenu,
  (data: boolean) => data
);

export const selectFavoriteTokensAddress = createSelector(
  (state: AppState) => state.common.favoriteTokens,
  (data: string[]) => data
);

export const selectShowConnectWalletModal = createSelector(
  (state: AppState) => state.common.showConnectWalletModal,
  (data: boolean) => data
);

export const selectChainConfig = createSelector(
  (state: AppState) => state.common.chainConfig,
  (data?: KeplrConfig) => data
);

export const selectIsAuraConfig = createSelector(
  (state: AppState) => state.common.isAuraConfig,
  (data: boolean) => data
);
