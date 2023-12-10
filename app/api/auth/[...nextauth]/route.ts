
import NextAuth from "next-auth";
import {authOptions} from "@/app/utils/authOptions";


// Обработчик аутентификации
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST, authOptions};



