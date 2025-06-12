import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Note } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface NoteEditProps {
    note: Note;
}

export default function NoteEdit({ note }: NoteEditProps) {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [loading, setLoading] = useState(false);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setTitle(note.title);
        setContent(note.content);
    }, [note]);

    const autoResize = (el: HTMLTextAreaElement) => {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    };

    const saveNote = (newTitle: string, newContent: string) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            setLoading(true);
            router.patch(
                route('notes.update', note.id),
                {
                    title: newTitle,
                    content: newContent,
                },
                {
                    preserveScroll: true,
                    onFinish: () => setLoading(false),
                },
            );
        }, 800);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setTitle(value);
        saveNote(value, content);
        autoResize(e.target);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);
        saveNote(title, value);
        autoResize(e.target);
    };

    return (
        <div className="space-y-1 p-3 pt-0 text-sm text-gray-700 dark:text-gray-300">
            <div>
                <label className="font-medium text-gray-900 dark:text-gray-100">Title: </label>
                <br />
                <textarea
                    className="w-full resize-none overflow-hidden rounded bg-transparent py-1 whitespace-pre-wrap text-gray-900 hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-100"
                    value={title}
                    rows={1}
                    onChange={handleTitleChange}
                    ref={(el) => {
                        if (el) autoResize(el);
                    }}
                />
            </div>

            <div>
                <label className="font-medium text-gray-900 dark:text-gray-100">Content: </label>
                <br />
                <textarea
                    className="w-full resize-none overflow-hidden rounded bg-transparent py-1 whitespace-pre-wrap text-gray-900 hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-100"
                    value={content}
                    rows={1}
                    onChange={handleContentChange}
                    ref={(el) => {
                        if (el) autoResize(el);
                    }}
                />
            </div>

            <DropdownMenuSeparator className="mt-3" />
            <p className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                    Created: {new Date(note.created_at).toLocaleString()} | Updated: {new Date(note.updated_at).toLocaleString()}
                </span>
                <span>{loading ? <span className="animate-pulse text-blue-500">Saving...</span> : 'Click on text to edit'}</span>
            </p>
        </div>
    );
}
