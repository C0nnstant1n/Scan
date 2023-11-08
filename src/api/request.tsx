import axios from "axios";
import { mainURL, login } from "./vars";

async function loginApi(data: FormData) {
  let loginData = {
    login: "",
    password: "",
  };

  data.forEach((value, key) => (loginData[key] = value));
  // console.log(loginData);

  const loginResponse = await axios
    .post(mainURL + login, loginData)
    .then((request) => {
      console.log(request);
      if (request.status === 200) {
        localStorage.setItem("accessToken", request.data.accessToken);
        localStorage.setItem("expire", request.data.expire);
      }
      return [request.status, request.statusText];
    });
  return loginResponse;
}

export default loginApi;
