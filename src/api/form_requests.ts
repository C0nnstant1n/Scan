import { redirectDocument, type LoaderFunctionArgs } from "react-router-dom";

export default async function searchAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  //   const Data = formData.get("inn") as string | null;
  formData.forEach((key, value) => {
    console.log(key, ": ", value);
  });
  await new Promise((r) => setTimeout(r, 150000));
  let redirectTo = formData.get("redirectTo") as string | null;
  return redirectDocument(redirectTo || "/search");
}
