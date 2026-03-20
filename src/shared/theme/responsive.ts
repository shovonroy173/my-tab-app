import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export function wp(percent: number) {
  return widthPercentageToDP(percent);
}

export function hp(percent: number) {
  return heightPercentageToDP(percent);
}

export function rw(px: number) {
  return wp((px / BASE_WIDTH) * 100);
}

export function rh(px: number) {
  return hp((px / BASE_HEIGHT) * 100);
}

export function rf(px: number) {
  return Math.round((rw(px) + rh(px)) / 2);
}
