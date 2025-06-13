import { router } from '@inertiajs/react';

interface PaginationProps {
  notes: {
    data: any[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    total?: number;
  };
}

export default function Pagination({ notes }: PaginationProps) {
  if (!notes.links || notes.links.length === 0 || !notes.total) return null;

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {notes.links.map((link, index) => (
          <button
            key={index}
            disabled={!link.url}
            dangerouslySetInnerHTML={{ __html: link.label }}
            onClick={() => {
              if (link.url) {
                router.get(link.url, {}, { preserveState: true, preserveScroll: true });
              }
            }}
            className={`
            rounded-md border px-3 py-1 transition-colors duration-200
            ${
              link.active
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : `bg-white text-black hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700`
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          />
        ))}
    </div>
  );
}
