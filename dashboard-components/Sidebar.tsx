'use client'
import {
  House,
  LogOut,
  MessageCircle,
  MessageSquareText,
  Cake,
  Settings,
  Bike,
  Users,
  Award,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function Sidebar({
  showSidebar,
  setSidebar,
}: {
  showSidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const SIDELINKS = [
    { name: "Home", Icon: House, href: "/kitchen" },
    { name: "Orders", Icon: Bike, href: "/kitchen/orders" },
    { name: "Messages", Icon: MessageCircle, href: "/kitchen/messages" },
    { name: "Products", Icon: Cake, href: "/kitchen/products" },
    { name: "Employees", Icon: Users, href: "/kitchen/employees" },
    { name: "News", Icon: MessageSquareText, href: "/kitchen/news" },
    { name: "Testimonials", Icon: Award, href: "/kitchen/testimonials" },
  ] as const;
  function closeSidebar() {
    setSidebar(false);
  }
  return (
    <section
      className={`bg-white borde border-gray-200 ${
        showSidebar ? "w-[45vw]" : "w-[0vw] hidden lg:block"
      } ${
        showSidebar ? "lg:w-[12vw] block" : "lg:w-[6vw] block"
      }  h-[90dvh] z-50 lg:h-[88dvh] fixed top-[10dvh] lg:top-[12dvh]  py-4 `}
    >
      <div className="flex flex-col justify-between  h-full w-full">
        <div className="flex flex-col gap-1">
          {SIDELINKS.map(({ name, Icon, href }) => (
            <Link
              title={name}
              href={href}
              key={name}
              onClick={closeSidebar}
              className={`flex items-center gap-4 flex-nowrap px-4 2xl:px-9 py-2 ${
                pathname === href
                  ? "text-indigo-500 font-semibold "
                  : "text-neutral-700 "
              } ${
                showSidebar && pathname === href
                  ? "bg-indigo-100 shadow w-[95%] rounded mx-0 "
                  : " hover:bg-indigo-50/70 w-[95%] rounded mx-0"
              } `}
            >
              <Icon size={22} className="" />
              <span
                className={`${
                  !showSidebar && "lg:hidden"
                } text-[14px] 2xl:text-sm`}
              >
                {name}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col  gap-1 ">
          <Link
            href={""}
             onClick={closeSidebar}
            className="flex items-center gap-4 flex-nowrap px-4 2xl:px-9 py-2 "
          >
            <Settings size={22} />
            <span
              className={`${
                !showSidebar && "lg:hidden"
              } text-[14px] 2xl:text-sm`}
            >
              Settings
            </span>
          </Link>
          <Link
            href={""}
             onClick={closeSidebar}
            className="flex items-center gap-4 flex-nowrap px-4 2xl:px-9 py-2 "
          >
            <LogOut size={22} />
            <span
              className={`${
                !showSidebar && "lg:hidden"
              } text-[14px] 2xl:text-sm`}
            >
              Log out
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
