import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage<{ notesCount: number }>();
    const { notesCount } = props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="mt-7 grid grid-cols-1 gap-4 px-4 pb-2 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow dark:border-sidebar-border dark:bg-muted">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Notes</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{notesCount}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow dark:border-sidebar-border dark:bg-muted">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Notes</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{notesCount}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow dark:border-sidebar-border dark:bg-muted">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Notes</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{notesCount}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow dark:border-sidebar-border dark:bg-muted">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Notes</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{notesCount}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow dark:border-sidebar-border dark:bg-muted">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Notes</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{notesCount}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow dark:border-sidebar-border dark:bg-muted">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Notes</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{notesCount}</div>
                </div>
            </div>
        </AppLayout>
    );
}
