// resources/js/Pages/Notes/partials/NoteList.tsx
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Note } from '@/types';
import { ChevronDown, Trash2 } from 'lucide-react';
import NoteEdit from './edit';

interface NoteListProps {
    notes: Note[];
    onDelete: (note: { id: number; title: string }) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
    if (notes.length === 0) {
        return (
            <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <p className="p-10 text-center text-xl font-semibold">No note available</p>
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
        );
    }

    return (
        <>
            {notes.map((note) => (
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
            ))}
        </>
    );
}
