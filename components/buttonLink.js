import Link from "next/link";

export default function ButtonLink({ children, ...props }) {
  return (
    <Link
      className="flex w-fit items-center rounded h-12 px-5 py-3 bg-gray-90 dark:bg-gray-variant-70 text-white text-sm"
      {...props}
    >
      {children}
    </Link>
  );
}
