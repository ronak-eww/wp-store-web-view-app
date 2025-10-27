import { Dimensions, Platform } from 'react-native';

export const isIos: boolean = Platform.OS === 'ios';
export const getDeviceOsType: string = isIos ? 'ios' : 'android';
export const { width, height } = Dimensions.get('screen');
