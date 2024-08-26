import { House } from "lucide-react";
import Link from "next/link";
import ToggleGroup from "@/components/ui/toggle-group";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Navigation({classId}: { classId: string}) {
  const pageName = usePathname();

  const options = useMemo(() => [
    { label: "Challenges", href: `/challenges${classId ? '?id=' + classId : ''}` },
    { label: "Soft skills", href: `/soft_skills${classId ? '?id=' + classId : ''}` },
    { label: "STEAM skills", href: `/steam_skills${classId ? '?id=' + classId : ''}` },
    { label: "Mentions", href: `/mentions${classId ? '?id=' + classId : ''}` },
  ], [classId]);

  const currentIndex = useMemo(() => {
    return options.findIndex(option => pageName === option.href.split('?')[0]);
  }, [options, pageName]);

  return (
    <section className="flex flex-row items-center mb-8">
      <Link className="h-8 w-8 bg-blue-1002 rounded-3xl hover:bg-blue-1001" href="/">
        <House className="w-8 h-8 p-1.5 text-white" />
      </Link>
      <div className="px-5 w-full flex justify-center">
        <ToggleGroup options={options} def={currentIndex === -1 ? 0 : currentIndex} />
      </div>
    </section>
  );
}
