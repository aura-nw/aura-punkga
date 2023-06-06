import { appSetting } from '../constants/configuration';
import { apiService } from './api.service';

const getMyPoolsUrl = `${appSetting.apiUrl}/my-pools`;

class PoolsService {
  getMyPools() {
    return apiService.get(getMyPoolsUrl);
  }
}

export const poolsService = new PoolsService();
