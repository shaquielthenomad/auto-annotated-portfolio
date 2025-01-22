import Head from 'next/head';
import Link from 'next/link';
import LoginBar from '../LoginBar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>Auto Annotated Portfolio</title>
                <meta name="description" content="Shaquiel's Portfolio" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <nav className="flex space-x-4">
                        <Link href="/" className="hover:text-gray-300">
                            Home
                        </Link>
                        <Link href="/store" className="hover:text-gray-300">
                            Store
                        </Link>
                    </nav>
                    <LoginBar />
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-6">{children}</main>

            <footer className="bg-gray-800 text-white p-4 text-center">© {new Date().getFullYear()} Shaquiel&apos;s Portfolio</footer>
        </div>
    );
}
