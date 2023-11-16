import axios from "axios";
import { mainURL, loginUrl, accountInfo } from "./vars";
import { redirectDocument } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";

interface ILoginData {
  login: string | null;
  password: string | null;
}
interface IAuthProvider {
  signin(loginData: ILoginData): Promise<void>;
  signout(): Promise<void>;
}

export const authProvider: IAuthProvider = {
  async signin(loginData) {
    await axios.post(mainURL + loginUrl, loginData).then((request) => {
      localStorage.setItem("accessToken", request.data.accessToken);
      localStorage.setItem("expire", request.data.expire);
      localStorage.setItem("user", loginData.login as string);
    });
  },
  async signout() {
    localStorage.clear();
  },
};

export default async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  console.log(formData);

  let loginData: ILoginData = {
    login: "",
    password: "",
  };

  loginData.login = formData.get("login") as string | null;
  loginData.password = formData.get("password") as string | null;

  // Sign in and redirect to the proper destination if successful.

  try {
    await authProvider.signin(loginData);
  } catch (error) {
    // console.log(error);
    if (error.response.data.message) {
      return { error: error.response.data.message };
    }
    return { error: error.message };
  }
  let redirectTo = formData.get("redirectTo") as string | null;
  console.log(redirectTo);

  return redirectDocument(redirectTo || "/");
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
