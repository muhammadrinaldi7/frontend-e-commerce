import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Button } from "./ui/button";

export const CardDashboard = ({
  title,
  value,
  icon,
  linkref,
}: {
  title: string;
  icon: IconDefinition;
  value: string | number;
  linkref: string;
}) => {
  return (
    <article
      className={`flex justify-between items-center gap-4 rounded-lg border border-indigo-400 bg-white p-6 `}
    >
      <div className="flex gap-4">
        <span className="rounded-full flex items-center bg-blue-100 p-3 text-blue-600">
          <FontAwesomeIcon icon={icon} className="size-8 text-xl" />
        </span>

        <div>
          <p className="text-2xl font-medium text-gray-900">{value}</p>

          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
      <Link href={linkref} className="cursor-pointer">
        <Button className="bg-indigo-600 text-white cursor-pointer hover:bg-white hover:text-indigo-600 hover:border-indigo-600 hover:border">
          View
        </Button>
      </Link>
    </article>
  );
};
