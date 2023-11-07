import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "My todos", href: "/my-todos" },
];

export const Navbar = () => {
  return (
    <nav className="fixed z-50 w-screen px-10 py-3 bg-transparent backdrop-blur-md">
      <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-between">
        <NavLink to={"/"} className="flex items-center flex-shrink-0">
          <img
            className="w-auto h-8"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Todo App"
          />
        </NavLink>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-sm duration-300"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
