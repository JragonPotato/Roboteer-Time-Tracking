import StatsDisplay from "../../components/StatsDisplay";
import {auth0} from "../../lib/auth0"
import * as jose from "jose";

export default async function Page() {
    const user = await auth0.getSession();

    const res = await fetch(`https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`);

    const decoder = new TextDecoder("utf-8");
    let read = ""
    for await (const chunk of res.body) {
        read += decoder.decode(chunk);
    }
    const { keys } = JSON.parse(read);

    if (keys.length == 0) throw new Error("JWT Key not found");
    const publicKey = await jose.importJWK(keys[0])

    const { payload, protectedHeader } = await jose.jwtVerify(user.tokenSet.idToken, publicKey, {

    })

    if (!payload["http://localhost:3000/roles"] || !(payload["http://localhost:3000/roles"] as any).includes("Admin")) throw new Error("Admin role not found");

    return <StatsDisplay />
}
