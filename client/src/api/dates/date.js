import axios from "../axios";

export const createDateRequest = async (date) => {
  axios.post("/dates/create", date);
};

export const updateDateRequest = async (date) => {
  axios.put("/dates/update", { date });
};

export const listDateRequest = async () => {
  axios.get("/dates/list");
};
