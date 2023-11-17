import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainURL, histogramsURL } from "../api/vars";
import axios from "axios";
import { Ihistograms } from "../api/histograms_interface";

// export const fetchHistograms = (histogram) => async (dispatch: AppDispatch) => {
//   console.log(histogram);
//   try {
//     dispatch(histogramsSlice.actions.histogramsFetching());
//     const token = localStorage.getItem("accessToken");
//     const response = await axios.post<Ihistograms>(
//       mainURL + histogramsURL,
//       histogram,
//       {
//         headers: {
//           Accept: "aplication/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     dispatch(histogramsSlice.actions.histogramsSuccses(response.data));
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);

//     dispatch(histogramsSlice.actions.histogramsError(error.message));
//   }
// };

export const fetchHistograms = createAsyncThunk(
  "histograms/fetchAll",
  async((data) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post<Ihistograms>(
      mainURL + histogramsURL,
      data,
      {
        headers: {
          Accept: "aplication/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  })
);
