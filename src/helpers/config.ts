import axios from 'axios';
import { AppConfig } from 'core/logic';
// import { ApiService } from 'services/api.service';

class Config {
  static env: 'devnet' | 'testnet' | 'mainnet';
  static isLiveNet: boolean;
  static apiUrl: string;
  static mockApiUrl: string;
  static requestTimeout: number;
  static appName: string;
  static auraRouter: string;
  static auraLpToken: string;
  static auraFactory: string;

  static chainInfo: AppConfig;
  static intervalRefreshBalance: number;
  static auraScanUrl: string;
  static axelarQueryUrl: string;
  static horoscopeUrl: string;
  static indexerUri: string;
  static celerUrl: string;
  static etherscan: string;

  static async loadConfig() {
    const { data } = await axios.get('config.json');

    Config.env = data.env;
    Config.isLiveNet = ['testnet', 'mainnet'].includes(data.env);
    Config.apiUrl = data.apiUrl;
    Config.mockApiUrl = data.mockApiUrl;
    Config.requestTimeout = data.requestTimeout;
    Config.appName = data.appName;
    Config.intervalRefreshBalance = data.intervalRefreshBalance || 30000;

    Config.chainInfo = data.chainInfo;
    Config.auraLpToken = data.auraLpToken;
    Config.auraFactory = data.auraFactory;
    Config.auraRouter = data.auraRouter;
    Config.auraScanUrl = data.auraScanUrl;
    Config.axelarQueryUrl = data.axelarQueryUrl;
    Config.horoscopeUrl = data.horoscopeUrl;
    Config.indexerUri = data.indexerUri;
    Config.celerUrl = data.celerUrl;
    Config.etherscan = data.etherscan;

    // ApiService.initialApiService();
  }
}

export default Config;
