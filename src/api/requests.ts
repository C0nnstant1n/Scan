import axios from "axios";
import { mainURL, login, accountInfo } from "./vars";
import { redirect } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";

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

export default async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  // Sign in and redirect to the proper destination if successful.
  try {
    await loginApi(formData);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    console.log(error);
    return {
      error: err.response.data.message,
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

export async function AccountInfo() {
  const token = localStorage.getItem("accessToken");
  const info = await axios
    .get(mainURL + accountInfo, {
      headers: {
        Accept: "aplication/json",
        "Content-Type": "aplication/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return info;
}
