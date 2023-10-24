import { getDictionary } from "@/lib/dictionary";
import { Register } from "./Register";
import { Locale } from "@/i18n.config";

export default async function RegisterPage({
   params: { lang }
}: {
   params: { lang: Locale }
}) {
   const { auth } = await getDictionary(lang)

   return <Register {...auth.register} />
} 