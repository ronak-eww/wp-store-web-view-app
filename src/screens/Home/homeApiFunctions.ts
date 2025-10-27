/* eslint-disable @typescript-eslint/no-unused-vars */
import { INIT_SETTINGS_API } from '../../helpers/apiHelpers/ApiConstants';
import { axiosGETRequest } from '../../helpers/apiHelpers/ApiFunctions';
import { getDeviceOsType } from '../../utils/commonFunctions';

export const getSettingLinkApi = async () => {
  try {
    const response = await axiosGETRequest(
      `${INIT_SETTINGS_API}?deviceType=${getDeviceOsType}`,
    );
    if (response?.data?.success) {
      return response?.data;
    }
    return false;
  } catch (error) {
    return false;
  }
};
