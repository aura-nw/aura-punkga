import { AppState } from 'redux-store';
import { APIMapping } from 'services';
import { Themes } from 'constants/constants';
declare global {
  type ThunkAPIConfig = {
    dispatch: Dispatch;
    rejectValue: {
      errorMessage: string;
    };
    state: AppState;
    extra: DeepPartial<APIMapping>;
  };

  interface CommonState {
    lang?: string;
    theme: Themes;
  }
}
