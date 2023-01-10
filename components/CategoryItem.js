import Link from "next/link";

export default function CategoryItem(props) {
  const { items, name } = props;

  return (
    <div className="pt-5 px-4">
      <h2 className="font-bold text-base">{name}</h2>
      <div className="flex flex-wrap gap-2 pt-2">
        {items.map((item) => (
          <Link
            href={`/categories/${item.toLowerCase()}`}
            key={item}
            className="flex w-[calc((100%_/_3)_-_6px)] md:w-[calc((100%_/_4)_-_12px)]"
          >
            <article className="bg-white p-4 rounded-md shadow-sm w-full">
              <p className="capitalize text-center">{item}</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
