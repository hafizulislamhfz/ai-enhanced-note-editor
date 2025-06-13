import Pagination from '@/components/ui/pagination';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Note } from '@/types';
import { router } from '@inertiajs/react';
import { ChevronDown, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import NoteEdit from './edit';

interface NoteListProps {
    notes: {
        data: Note[];
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    onDelete: (note: { id: number; title: string }) => void;
    search?: string;
}

export default function NoteList({ notes, onDelete, search = '' }: NoteListProps) {
    const [query, setQuery] = useState(search);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            router.get(route('notes.index'), { search: val }, { preserveState: true, preserveScroll: true });
        }, 500);
    };
    return (
        <>
            <div className="">
                <input
                    type="search"
                    value={query}
                    onChange={handleSearchChange}
                    placeholder="Search notes..."
                    className="w-full rounded-md border px-3 py-2 outline-none dark:bg-black dark:text-white"
                />
            </div>
            {notes.data.length === 0 ? (
                <>
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <p className="p-10 text-center text-xl font-semibold">No note available</p>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </>
            ) : (
                notes.data.map((note) => (
                    <details
                        key={note.id}
                        className="group overflow-x-auto rounded-xl border border-sidebar-border/70 transition-all open:border-2 open:border-black open:shadow-md dark:border-sidebar-border dark:open:border-white"
                    >
                        <summary className="flex cursor-pointer items-center justify-between p-3 font-medium text-gray-900 dark:text-gray-100">
                            <ChevronDown className="transition-transform duration-300 group-open:rotate-180" size={20} />
                            <span className="ml-3 min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap select-none">{note.title}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete({ id: note.id, title: note.title });
                                }}
                                className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
                                aria-label="Delete note"
                                type="button"
                            >
                                <Trash2 size={20} />
                            </button>
                        </summary>

                        <div>
                            <NoteEdit note={note} />
                        </div>
                    </details>
                ))
            )}
            <Pagination notes={notes} />
        </>
    );
}
