export const setData = item => {
  return {
    type: 'GET_DATA',
    payload: item,
  };
};
export const setImageSlider = item => {
  return {
    type: 'IMAGE_SLIDER',
    payload: item,
  };
};
export const setRestaurants = item => {
  return {
    type: 'GET_RESTAURANTS',
    payload: item,
  };
};
export const setMenuList = item => {
  return {
    type: 'GET_MENULIST',
    payload: item,
  };
};
