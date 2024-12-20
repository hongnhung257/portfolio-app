import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { useIsAuthen } from "@/app/stores/authen.store";

export function middleware(request: NextRequest) {
	const isAuth = useIsAuthen;
	const cookiesStore = cookies();
	const isAuthen = cookiesStore.get("token")?.value && isAuth;

	if (isAuthen && request.nextUrl.pathname === "/login") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
	if (!isAuthen && request.nextUrl.pathname === "/dashboard") {
		return NextResponse.rewrite(new URL("/login", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/login", "/dashboard"],
};
