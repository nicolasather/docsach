import Link from "next/link";

export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children?: React.ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div className="border-y border-dashed border-line py-12 text-center">
      <p className="font-serif text-2xl font-semibold text-forest">{title}</p>
      {children && <div className="mx-auto mt-3 max-w-xl text-ink-soft">{children}</div>}
      {action && (
        <Link href={action.href} className="btn btn-primary mt-6">
          {action.label}
        </Link>
      )}
    </div>
  );
}
