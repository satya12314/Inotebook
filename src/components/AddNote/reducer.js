export const actions = { ADD_STATE: "ADD_STATE", RESET: "RESET" };
export const initialState = {
  title: "",
  discription: "",
  tag: "",
};

export const addNotereducer = (state, action) => {
  //   console.log(state, action);
  const { payload, type } = action;

  switch (type) {
    case actions.ADD_STATE: {
      const { fieldName, value } = payload;

      return {
        ...state,
        [fieldName]: value,
      };
    }

    case actions.RESET:
      return initialState;
  }
};
