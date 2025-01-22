// src/middleware.js
import { NextResponse } from 'next/server';

export default function middleware(request) {
    // Add any middleware logic here
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
