import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrPerson: [
    {
      id: "SV01",
      name: "Nguyễn Văn A",
      phone: "0345352777",
      email: "nguyenvana@gmail.com",
    },
    {
      id: "SV02",
      name: "Nguyễn Văn B",
      phone: "0868642888",
      email: "nguyenvanb@gmail.com",
    },
  ],
  arrPersonUpdate: [
    {
      id: "SV01",
      name: "Nguyễn Văn A",
      phone: "0345352777",
      email: "nguyenvana@gmail.com",
    },
    {
      id: "SV02",
      name: "Nguyễn Văn B",
      phone: "0868642888",
      email: "nguyenvanb@gmail.com",
    },
  ],
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

  editErrors: {
    id: "",
    name: "",
    phone: "",
    email: "",
  },

  disabled: false,
  disUpdate: true,
};

const personReducer = createSlice({
  name: "personReducer",
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.arrPerson.push(action.payload);
      state.arrPersonUpdate.push(action.payload);
    },
    changeInput: (state, action) => {
      state.values[action.payload.id] = action.payload.value;
    },

    changeError: (state, action) => {
      state.errors[action.payload.id] = action.payload.value;
    },
    delPerson: (state, action) => {
      let id = action.payload;
      let indexDel = state.arrPerson.findIndex((per) => per.id === id);
      if (indexDel !== -1) {
        state.arrPerson.splice(indexDel, 1);
        state.arrPersonUpdate.splice(indexDel, 1);
      }
    },
    editPerson: (state, action) => {
      state.disabled = true;
      state.disUpdate = false;
      state.values = action.payload;
    },
    editError: (state, action) => {
      state.errors = action.payload;
    },
    updatePerson: (state, action) => {
      state.disabled = false;
      state.disUpdate = true;
      const { id, value } = action.payload;
      const indexUpdate = state.arrPerson.findIndex((per) => per.id === id);
      if (indexUpdate !== -1) {
        state.arrPerson[indexUpdate] = {
          ...state.arrPerson[indexUpdate],
          ...value,
        };
      }
      const indexUpdateSearch = state.arrPersonUpdate.findIndex(
        (per) => per.id === id
      );
      if (indexUpdateSearch !== -1) {
        state.arrPersonUpdate[indexUpdateSearch] = {
          ...state.arrPersonUpdate[indexUpdateSearch],
          ...value,
        };
      }
    },
    resetForm: (state) => {
      // state.values = state.resForm.values;
      // state.errors = state.resForm.errors;
      state.values = initialState.values;
      state.errors = initialState.errors;
    },

    searchPerson: (state, action) => {
      const keyword = action.payload.toLowerCase();
      state.arrPerson = state.arrPersonUpdate.filter((per) =>
        per.name.toLowerCase().includes(keyword)
      );
    },
  },
});

export const {
  changeInput,
  addPerson,
  changeError,
  delPerson,
  editPerson,
  updatePerson,
  resetForm,
  editError,
  changeSearch,
  searchPerson,
} = personReducer.actions;

export default personReducer.reducer;
