import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
    note: { id: number; title: string } | null;
}

export default function DeleteNoteModal({ open, onClose, note }: Props) {
    const { delete: destroy, processing } = useForm();
    const [loading, setLoading] = useState(false);

    if (!open || note === null) return null;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        destroy(route('notes.destroy', note.id), {
            onSuccess: () => {
                setLoading(false);
                onClose();
            },
            onError: () => {
                setLoading(false);
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                <h2 className="mb-4 text-xl font-semibold">Delete Note</h2>
                <form onSubmit={submit} className="space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                        Are you sure you want to delete the note <strong>{note.title ?? ''}</strong>? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-2 pt-3">
                        <button
                            type="button"
                            className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 dark:text-white"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex min-w-20 cursor-pointer items-center justify-center rounded-md bg-red-600 px-4 py-2 text-white disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
