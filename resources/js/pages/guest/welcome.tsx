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
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
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
