const initialValues = {
  imageSlider: [],
  Data: [],
  restaurants: [],
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
    default:
      return state;
  }
};

export default Reducers;
