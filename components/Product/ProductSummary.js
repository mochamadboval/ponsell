import Image from "next/image";

export default function ProductSummary(props) {
  let { icon, info, isFullBox, secondInfo, thirdInfo, title } = props;

  let productInfo = <p className="my-auto pt-2 text-center">{info}</p>;

  if (secondInfo) {
    productInfo = (
      <p className="my-auto pt-2 text-center">
        {info} <br /> {secondInfo}
      </p>
    );
  }
  if (thirdInfo) {
    productInfo = (
      <p className="my-auto pt-2 text-center">
        {info} <br /> {secondInfo} <br /> {thirdInfo}
      </p>
    );
  }

  return (
    <div
      className={`border border-neutral-200 flex flex-col items-center p-2 rounded-md ${
        isFullBox ? "w-full" : "w-[calc((100%_/_2)_-_4px)]"
      }`}
    >
      <h4 className="flex items-center text-neutral-500">
        <Image src={`/icons/${icon}.svg`} alt="" width={14} height={14} />
        <span className="pl-1">{title}</span>
      </h4>
      {productInfo}
    </div>
  );
}
