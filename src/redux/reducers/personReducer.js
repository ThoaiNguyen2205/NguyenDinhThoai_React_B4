import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrPerson: [
    {
      id: "SV01",
      name: "Nguyễn Văn A",
      phone: "0909090909",
      email: "nguyenvana@gmail.com",
    },
    {
      id: "SV02",
      name: "Nguyễn Văn B",
      phone: "0909099999",
      email: "nguyenvanb@gmail.com",
    },
  ],
  values: {
    id: "",
    name: "",
    phone: "",
    email: "",
  },
  resForm: {
    values: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
    errors: {
      id: "(*)",
      name: "(*)",
      phone: "(*)",
      email: "(*)",
    },
  },
  errors: {
    id: "(*)",
    name: "(*)",
    phone: "(*)",
    email: "(*)",
  },
  disabled: false,
};

const personReducer = createSlice({
  name: "personReducer",
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.arrPerson.push(action.payload);
    },
    changeInput: (state, action) => {
      state.values[action.payload.id] = action.payload.value;
    },
    handleError: (state, action) => {
      state.errors[action.payload.id] = action.payload.value;
    },
    delPerson: (state, action) => {
      let id = action.payload;
      let indexDel = state.arrPerson.findIndex((per) => per.id === id);
      if (indexDel !== -1) {
        state.arrPerson.splice(indexDel, 1);
      }
    },
    editPerson: (state, action) => {
      state.disabled = true;
      state.values = action.payload;
    },
    updatePerson: (state, action) => {
      state.disabled = false;
      const { id, value } = action.payload;
      const indexUpdate = state.arrPerson.findIndex((per) => per.id === id);
      if (indexUpdate !== -1) {
        state.arrPerson[indexUpdate] = {
          ...state.arrPerson[indexUpdate],
          ...value,
        };
      }
    },
    resetForm: (state, action) => {
      state.values = state.resForm.values;

      console.log("resvalue", state.resValue);
    },
  },
});

export const {
  changeInput,
  addPerson,
  handleError,
  delPerson,
  editPerson,
  updatePerson,
  resetForm,
} = personReducer.actions;

export default personReducer.reducer;
