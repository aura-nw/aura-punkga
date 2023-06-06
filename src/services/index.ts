import { apiService } from './api.service';
import { poolsService } from './pool.service';

export const apiMapping = {
  apiService,
  poolsService: poolsService
};

export { apiService, poolsService };
export type APIMapping = typeof apiMapping;
