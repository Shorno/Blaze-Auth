import {cookies} from "next/headers";
import {jwtVerify} from "jose";

const JWT_COOKIE_NAME = 'token';
const secretKey = process.env.JWT_SECRET;
console.log('secretKey', secretKey)

const encodedKey = new TextEncoder().encode(secretKey);


export const verifySession = async () => {
    const cookie = cookies().get(JWT_COOKIE_NAME)?.value;
    const session = await decrypt(cookie);
    console.log(session)

    return {
        isAuthenticated: !!session?.id,
        userId: session?.id,
        email: session?.email,
        username: session?.username,
    }
}


export async function decrypt(session: string | undefined) {
    if (!session) {
        return null;
    }
    try {
        const {payload} = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        });
        return payload;
    } catch (error) {
        console.log("Failed to decrypt session", secretKey, session, error);
    }
}

//
// import { cookies } from "next/headers";
// import { jwtVerify } from "jose";
//
// const JWT_COOKIE_NAME = 'token';
// const secretKey = process.env.JWT_SECRET;
// const encodedKey = new TextEncoder().encode(secretKey);
//
// export const verifySession = async () => {
//     const cookie = cookies().get(JWT_COOKIE_NAME)?.value;
//     if (!cookie) {
//         return null;
//     }
//     try {
//         const { payload } = await jwtVerify(cookie, encodedKey, {
//             algorithms: ['HS256']
//         });
//         return payload? payload.id : null;
//     } catch (error) {
//         console.log("Failed to decrypt session", error);
//         return null;
//     }
// };