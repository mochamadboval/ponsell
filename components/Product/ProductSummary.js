import Image from "next/image";

import { Fragment } from "react";

export default function ProductSummary(props) {
  let { icon, info, isFullBox, secondInfo, thirdInfo, title } = props;

  let productInfo = info;

  if (secondInfo) {
    productInfo = (
      <Fragment>
        {info} <br /> {secondInfo}
      </Fragment>
    );
  }
  if (thirdInfo) {
    productInfo = (
      <Fragment>
        {info} <br /> {secondInfo} <br /> {thirdInfo}
      </Fragment>
    );
  }

  return (
    <div
      className={`${
        isFullBox ? "w-full" : "w-[calc((100%_/_2)_-_4px)]"
      } border border-neutral-200 flex flex-col items-center p-2 rounded-md text-center`}
    >
      <h4 className="flex items-center text-neutral-500">
        <Image src={`/icons/${icon}.svg`} alt="" width={14} height={14} />
        <span className="pl-1">{title}</span>
      </h4>
      <p className="my-auto pt-2">{productInfo}</p>
    </div>
  );
}
