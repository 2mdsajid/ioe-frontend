import { google } from "@/lib/auth/lucia-auth";
import { generateState, generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest): Promise<Response> {
	console.log("GET request received");
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const urlParams = request.nextUrl.searchParams;
    const redirectTo = urlParams.get("ru");

	console.log("State:", state);
	console.log("Code Verifier:", codeVerifier);

	const url = google.createAuthorizationURL(state, codeVerifier, ["openid", "profile","email"]);

	if (redirectTo) {
        url.searchParams.set("state", `${state}:${encodeURIComponent(redirectTo)}`); // Combine state and redirect URL
		console.log("Redirect URL:", redirectTo)
    }
	
	const cookieStore = await cookies();
	cookieStore.set("google_oauth_state", state, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax"
	});
	cookieStore.set("google_code_verifier", codeVerifier, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax"
	});

	console.log("Redirecting to:", url.toString());
	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}