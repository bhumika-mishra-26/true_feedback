// import {NextRequest,NextResponse} from 'next/server';

// export {default} from 'next-auth/middleware';
// import {getToken} from 'next-auth/jwt';

// export  async function middleware(req:NextRequest)
// {
//     const token= await getToken({req:req});
//     const url=req.nextUrl

// if(token &&(
//     url.pathname.startsWith('/sign-in') ||
//     url.pathname.startsWith('/sign-up')
//     ||
//     url.pathname.startsWith('/verify')

//     // url.pathname.startsWith('/')
// ))
// {

//     return NextResponse.redirect(new URL('/dashboard',req.url));

// }
//   return NextResponse.redirect(new URL('/',req.url));
// }
// export const config={
//     matcher:['/sign-in',
//         '/sign-up',
//         '/',
//         '/dashboard/:path*',
//         '/verify/:path*'


//     ]

// }
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  // if logged in and tries to access auth pages
  if (
    token &&
    (
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify")
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // if not logged in and trying dashboard
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/dashboard/:path*",
    "/verify/:path*",
  ],
};