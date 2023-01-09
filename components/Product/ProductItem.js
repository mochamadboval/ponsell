import Image from "next/image";
import Link from "next/link";

export default function ProductItem(props) {
  const { product } = props;

  return (
    <Link
      href={`/products/${product.id}`}
      className="flex justify-center w-[calc((100%_/_2)_-_8px)] sm:w-[calc((100%_/_4)_-_12px)]"
    >
      <article className="bg-white flex flex-col gap-2 p-4 rounded-md shadow-sm">
        <Image
          src={product.images}
          alt={product.name}
          width={340}
          height={340}
          className="product-image"
        />
        <h2 className="mt-2">{product.name}</h2>
        <p className="font-bold mt-auto">${product.price}</p>
        <p className="text-neutral-500 text-xs">
          {product.RAM} / {product.internal}
        </p>
      </article>
    </Link>
  );
}
