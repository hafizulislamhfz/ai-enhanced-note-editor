import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateNoteModal({ open, onClose }: Props) {
    const { data, setData, post, reset } = useForm({ title: '', content: '' });
    const [loading, setLoading] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        post(route('notes.store'), {
            onSuccess: () => {
                reset();
                onClose();
                setLoading(false);
            },
            onFinish: () => setLoading(false),
        });
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-5xl rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                <h2 className="mb-4 text-xl font-semibold">Create Note</h2>
                <form onSubmit={submit} className="space-y-3">
                    <input
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Note title"
                        className="w-full rounded-md border px-3 py-2 outline-none dark:bg-black"
                        required
                    />
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        placeholder="Note content"
                        className="w-full rounded-md border px-3 py-2 outline-none dark:bg-black"
                        rows={10}
                    />
                    <div className="flex justify-end gap-2 pt-3">
                        <button
                            type="button"
                            className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 dark:text-white"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex min-w-28 cursor-pointer items-center justify-center rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
