import { Locale } from "@/i18n.config";
import { Login } from "./Login";
import { getDictionary } from "@/lib/dictionary";

export default async function LoginPage({
   params: { lang }
}: {
   params: { lang: Locale }
}) {
   const { auth } = await getDictionary(lang)

   return <Login {...auth.login} />
}