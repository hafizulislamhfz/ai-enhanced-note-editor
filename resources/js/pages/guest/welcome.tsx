import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-[#fdfdfd] to-[#f7f5f0] px-6 py-12 text-gray-900 lg:px-12 dark:from-[#0c0c0c] dark:to-[#121212] dark:text-gray-100">
                {/* Header */}
                <header className="flex w-full max-w-7xl items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">NoteAI</h1>
                    <nav>
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <a
                                href="/auth/google"
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M533.5 278.4c0-17.4-1.6-34.2-4.7-50.4H272v95.3h146.9c-6.3 34-25 62.7-53.4 82v68.2h86.2c50.4-46.5 81.8-115.1 81.8-195.1z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M272 544.3c72.6 0 133.6-24.1 178.2-65.2l-86.2-68.2c-24 16.1-54.8 25.6-92 25.6-70.7 0-130.6-47.8-152-112.1H30v70.4C74.6 482.2 167.5 544.3 272 544.3z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M120 324.4c-10.5-30.9-10.5-64 0-94.9V159h-90C4.3 202.1-5.4 251.6 0 300c5.4 48.4 26.5 93 60 129l90-70.6z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M272 107.2c39.6-.6 77.9 13.7 107.5 39.8l80.6-80.6C408.2 21.3 342-1.3 272 0 167.5 0 74.6 62.1 30 159l90 70.5C141.4 155 201.3 107.2 272 107.2z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Log in with Google
                            </a>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="mt-24 flex max-w-3xl flex-col items-center text-center">
                    <h2 className="text-4xl leading-tight font-extrabold lg:text-6xl">Supercharge your notes with AI</h2>
                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
                        Create, edit, and enhance your notes using AI-powered features like summarization and tagging — all in real time.
                    </p>
                    <div className="mt-10">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <a
                                href="/auth/google"
                                className="inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                            >
                                Get Started with Google
                            </a>
                        )}
                    </div>
                </main>

                {/* Footer Spacer */}
                <footer className="h-16" />
            </div>
        </>
    );
}
