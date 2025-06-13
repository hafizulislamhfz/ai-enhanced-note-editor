import { router, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateNoteModal({ open, onClose }: Props) {
    const { errors } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [generatingMode, setGeneratingMode] = useState<null | 'generate-title' | 'generate-content'>(null);
    const [values, setValues] = useState({ title: '', content: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        router.post(route('notes.store'), values, {
            onSuccess: () => {
                setValues({ title: '', content: '' });
                onClose();
            },
            onFinish: () => setLoading(false),
        });
    };

    const handleGenerate = (mode: 'generate-title' | 'generate-content') => {
        setGeneratingMode(mode);

        const payload = mode === 'generate-title' ? { mode, content: values.content } : { mode, title: values.title };

        router.post(route('notes.ai.generate'), payload, {
            preserveScroll: true,
            only: [],
            onSuccess: (page) => {
                const data = (page.props?.flash as { data?: string })?.data;
                if (data) {
                    setValues((prev) => ({
                        ...prev,
                        [mode === 'generate-title' ? 'title' : 'content']: data,
                    }));
                }
            },
            onError: (err) => {
                console.error('AI generation failed', err);
            },
            onFinish: () => setGeneratingMode(null),
        });
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-5xl rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                <h2 className="mb-4 text-xl font-semibold">Create Note</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <input
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            placeholder="Note title"
                            disabled={generatingMode === 'generate-title'}
                            className={`w-full ${generatingMode === 'generate-title' ? 'animate-pulse' : ''} rounded-md border px-3 py-2 outline-none dark:bg-black`}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}

                        <div className="mt-1 text-right">
                            <span className="cursor-pointer text-sm hover:text-blue-500" onClick={() => handleGenerate('generate-title')}>
                                {generatingMode === 'generate-title' ? (
                                    <span className="animate-pulse text-blue-500">Generating title...</span>
                                ) : (
                                    'Generate title from content using AI'
                                )}
                            </span>
                        </div>
                    </div>

                    <div>
                        <textarea
                            name="content"
                            value={values.content}
                            onChange={handleChange}
                            placeholder="Note content"
                            disabled={generatingMode === 'generate-content'}
                            className={`w-full ${generatingMode === 'generate-content' ? 'animate-pulse' : ''} rounded-md border px-3 py-2 outline-none dark:bg-black`}
                            rows={10}
                        />
                        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                        <div className="text-right">
                            <span className="cursor-pointer text-sm hover:text-blue-500" onClick={() => handleGenerate('generate-content')}>
                                {generatingMode === 'generate-content' ? (
                                    <span className="animate-pulse text-blue-500">Generating content...</span>
                                ) : (
                                    'Generate content from title using AI'
                                )}
                            </span>
                        </div>
                    </div>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}

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
