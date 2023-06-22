const initialValues = {
  imageSlider: [],
  Data: [],
  restaurants: [],
  menuList: [],
};

const Reducers = (state = initialValues, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...action.state,
        Data: action.payload,
      };
    case 'IMAGE_SLIDER':
      return {
        ...action.state,
        imageSlider: action.payload,
      };
    case 'GET_RESTAURANTS':
      return {
        ...action.state,
        restaurants: action.payload,
      };
    case 'GET_MENULIST':
      return {
        ...action.state,
        menuList: action.payload,
      };
    default:
      return state;
  }
};

export default Reducers;
