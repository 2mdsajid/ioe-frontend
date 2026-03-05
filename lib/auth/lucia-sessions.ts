import { LuciaSession, LuciaSessionValidationResult, TLuciaGoogleAuth } from "@/lib/auth/schema";
import { TBaseUser } from "@/lib/schema/users.schema";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32, encodeHexLowerCase } from "@oslojs/encoding";
import { cookies } from "next/headers";

//  make this function -- send a request to backend server to get the user data with that payload 
export async function getUserFromGoogleId(userData: TLuciaGoogleAuth): Promise<{
	data: TBaseUser | null;
	message: string;
}> {
	try {
		// console.log("Starting getUserFromGoogleId with data:", userData);
		const response = await fetch(
			`${process.env.BACKEND}/users/lucia-google-auth-ioe`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			}
		);

		if (!response.ok) {
			console.error("Error response from backend:", response.status, response.statusText);
			return { data: null, message: "Invalid Response" }
		}

		const { data, message } = await response.json();
		// console.log("Response from backend:", { data, message });
		return { data, message }

	} catch (error) {
		console.error("Error in getUserFromGoogleId:", error);
		return { data: null, message: "Some Error occurred while processing request data" }
	}
}

export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
	const cookieStore = await cookies()
	cookieStore.set("session", token, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt
	});
}
export async function setAuthTokenCookie(token: string, expiresAt: Date): Promise<void> {
	const cookieStore = await cookies()
	cookieStore.set("ioe-auth-token", token, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt
	});
}

export async function setStreamCookie(stream: string, expiresAt: Date): Promise<void> {
	const cookieStore = await cookies()
	cookieStore.set("stream", stream, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt
	});
}


export async function deleteSessionTokenCookie(): Promise<void> {
	const cookieStore = await cookies()
	cookieStore.set("session", "", {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 0
	});
}

export async function deleteAuthTokenCookie(): Promise<void> {
	const cookieStore = await cookies()
	cookieStore.set("ioe-auth-token", "", {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 0
	});
}

export async function deleteStreamCookie(): Promise<void> {
	const cookieStore = await cookies()
	cookieStore.set("stream", "", {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 0
	});
}

export function generateSessionToken(): string {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	const token = encodeBase32(tokenBytes).toLowerCase();
	return token;
}

export function createSession(token: string, userId: string): LuciaSession {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: LuciaSession = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	// db.execute("INSERT INTO session (id, user_id, expires_at) VALUES (?, ?, ?)", [
	// 	session.id,
	// 	session.userId,
	// 	Math.floor(session.expiresAt.getTime() / 1000)
	// ]);
	return session;
}

// --------------------------NOT IMPLEMENTED--------------------------------
//  --------------------------- NOT LINKED WITH THE DATABSE
export function validateSessionToken(token: string): LuciaSessionValidationResult | null {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	// 	const row = db.queryOne(
	// 		`
	// SELECT session.id, session.user_id, session.expires_at, user.id, user.google_id, user.email, user.name, user.picture FROM session
	// INNER JOIN user ON session.user_id = user.id
	// WHERE session.id = ?
	// `,
	// 		[sessionId]
	// 	);

	// 	if (row === null) {
	// 		return { session: null, user: null };
	// 	}
	// 	const session: Session = {
	// 		id: row.string(0),
	// 		userId: row.number(1),
	// 		expiresAt: new Date(row.number(2) * 1000)
	// 	};
	// 	const user: any = {
	// 		id: row.number(3),
	// 		googleId: row.string(4),
	// 		email: row.string(5),
	// 		name: row.string(6),
	// 		picture: row.string(7)
	// 	};
	// 	if (Date.now() >= session.expiresAt.getTime()) {
	// 		db.execute("DELETE FROM session WHERE id = ?", [session.id]);
	// 		return { session: null, user: null };
	// 	}
	// 	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
	// 		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
	// 		db.execute("UPDATE session SET expires_at = ? WHERE session.id = ?", [
	// 			Math.floor(session.expiresAt.getTime() / 1000),
	// 			session.id
	// 		]);
	// 	}
	// return { session, user }
	return null
}


// export const getCurrentSession = cache((): LuciaSessionValidationResult | null => {
// 	const cookieStore = await cookies()
// 	const token = cookies().get("session")?.value ?? null;
// 	if (token === null) {
// 		return { session: null, user: null };
// 	}
// 	const result = validateSessionToken(token);
// 	return result;
// });

export function invalidateSession(sessionId: string): void {
	// db.execute("DELETE FROM session WHERE id = ?", [sessionId]);
}

export function invalidateUserSessions(userId: number): void {
	// db.execute("DELETE FROM session WHERE user_id =?", [userId]);
	// db.execute("DELETE FROM session WHERE user_id = ?", [userId]);
}

