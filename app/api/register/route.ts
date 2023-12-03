import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import {NextResponse} from "next/server";

/**
 * Обрабатывает POST запрос.
 *
 * @param request - Объект запроса.
 * @returns Промис с результатом обработки запроса.
 */
export async function POST(
    request: Request
) {
    try {
        // Получаем тело запроса в формате JSON
        const body = await request.json();
        const {email, name, password} = body;

        // Проверяем наличие всех необходимых полей в теле запроса
        if (!email || !name || !password) {
            // Возвращаем ошибку с кодом 400 и сообщением об отсутствующей информации
            return new NextResponse('Отсутствует информация', {status: 400});
        }

        // Хешируем пароль с помощью bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);

        // Создаем нового пользователя в базе данных
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })

        // Возвращаем успешный ответ с данными пользователя
        return NextResponse.json(user);
    } catch (error: any) {
        // В случае возникновения ошибки выводим ее в консоль и возвращаем ошибку с кодом 500
        console.log(error, 'REGISTRATION_ERROR');
        return new NextResponse('Внутренняя ошибка', {status: 500});
    }
}