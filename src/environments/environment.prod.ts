import { environmment as defaultEnvironment } from './environment.default';

export const environment = {
  ...defaultEnvironment,
  production: true,
   BASE_URL: 'https://c360.zone/elements_clothing_llp_ui',
   REST_API_URL:'https://c360.zone/elements_clothing_llp_api'
  //BASE_URL: 'https://c360.zone/demo/pcube_ui_dev',
  //REST_API_URL:'https://c360.zone/demo/pcube_api_dev'
};
