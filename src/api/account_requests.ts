import axios, {AxiosError} from "axios";
import { mainURL, loginUrl, accountInfo } from "./vars";
import { redirectDocument } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";

interface ILoginData {
  login: string | null;
  password: string | null;
}
interface IAuthProvider {
  signIn(loginData: ILoginData): Promise<void>;
  signOut(): Promise<void>;
}

interface IResponse {
  data: {
    accessToken: string
    expire: string
  }
}

export const authProvider: IAuthProvider = {
  async signIn(loginData) {
    await axios.post(mainURL + loginUrl, loginData).then((request:IResponse) => {
      console.log(request)
      localStorage.setItem("accessToken", request.data.accessToken);
      localStorage.setItem("expire", request.data.expire);
      localStorage.setItem("user", loginData.login as string);
    });
  },
  async signOut() {
    localStorage.clear();
  },
};

export default async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  // console.log(request);
  // console.log(formData);

  const loginData: ILoginData = {
    login: "",
    password: "",
  };

  loginData.login = formData.get("login") as string | null;
  loginData.password = formData.get("password") as string | null;

  // Sign in and redirect to the proper destination if successful.


  interface PostErrorType  {
    message: string;
  }

  try {
    await authProvider.signIn(loginData);
  } catch (error) {
    const err = error as  AxiosError<PostErrorType>
    if (err.response && err.response.data) {
      return { error: err.response.data.message };
    }
    return { error: err.message };
  }
  const redirectTo = formData.get("redirectTo") as string | null;
  console.log(redirectTo);

  return redirectDocument(redirectTo || "/");
}

export async function AccountInfo() {
  const token = localStorage.getItem("accessToken");
  return await axios
    .get(mainURL + accountInfo, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
