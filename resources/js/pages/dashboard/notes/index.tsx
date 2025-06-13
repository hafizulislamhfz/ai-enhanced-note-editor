import AppLayout from '@/layouts/app-layout';
import { Note, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import CreateNoteModal from './partials/create';
import DeleteNoteModal from './partials/delete';
import NoteList from './partials/list';

interface NotesPageProps {
    notes: {
        data: Note[];
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notes',
        href: '/notes',
    },
];

export default function Notes() {
    const { notes } = usePage<NotesPageProps>().props;
    // Create modal state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Delete modal state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [selectedNote, setSelectedNote] = useState<{ id: number; title: string } | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Note List</h2>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="cursor-pointer rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
                    >
                        + Create Note
                    </button>
                </div>

                <div className="grid auto-rows-min gap-4">
                    <NoteList
                        notes={notes}
                        onDelete={(note) => {
                            setSelectedNote(note);
                            setIsDeleteModalOpen(true);
                        }}
                    />
                </div>
            </div>
            {/* Create Note Modal */}
            <CreateNoteModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
            {/* Delete Note Modal */}
            <DeleteNoteModal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} note={selectedNote} />
        </AppLayout>
    );
}
