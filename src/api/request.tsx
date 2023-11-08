import axios from "axios";
import { mainURL, login } from "./vars";

async function loginApi(data: FormData) {
  let loginData = {
    login: "",
    password: "",
  };

  data.forEach((value, key) => (loginData[key] = value));

  const loginResponse = await axios
    .post(mainURL + login, loginData)
    .then((request) => {
      //   console.log(request.data);
      if (request.status === 200) {
        localStorage.setItem("accessToken", request.data.accessToken);
        localStorage.setItem("expire", request.data.expire);
      }
      return [request.status, request.statusText];
    });

  console.log(loginResponse);

  return loginResponse;
}

export default loginApi;
