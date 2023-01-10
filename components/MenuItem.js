import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MenuItem(props) {
  const router = useRouter();

  const { children, name } = props;

  const path = name === "home" ? "/" : `/${name}`;
  const active = router.pathname === path ? "border-green-700" : "border-white";

  return (
    <li className="w-1/5">
      <Link
        href={path}
        className={`${active} border-t-2 flex flex-col items-center py-1`}
      >
        <Image src={`/icons/${name}.svg`} alt="" width={24} height={24} />
        <p className="text-xs">{children}</p>
      </Link>
    </li>
  );
}
