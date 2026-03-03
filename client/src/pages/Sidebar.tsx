
import { useState } from "react"
import { NavLink } from "react-router-dom"
import {client ,version} from "../config/app.config"

import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  Tag,
  Menu as MenuIcon,
  X as CloseIcon
} from "lucide-react"

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const [iconOnly, setIconOnly] = useState(false)
  const menu = [
    { name: "Home", path: "/", icon: LayoutDashboard },
    { name: "Inventory", path: "/inventory", icon: Package },
    { name: "Customers", path: "/customers", icon: Users },
    { name: "Suppliers", path: "/suppliers", icon: Truck },
    { name: "Brands", path: "/brands", icon: Tag },
    { name: "Offers", path: "/offers", icon: Tag }
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white/80 rounded-full p-2 shadow-lg backdrop-blur"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <MenuIcon size={24} />
      </button>

      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`sidebar fixed top-0 left-0 h-screen overflow-y-auto ${iconOnly ? "w-16" : "w-64 md:w-80"} bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col justify-between p-5 transition-all duration-300 md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} md:flex md:h-screen`}
        style={{ maxWidth: iconOnly ? 84 : 240 }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-8 right-4 z-50 bg-white/80 rounded-full p-1 shadow"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        >
          <CloseIcon size={16} />
        </button>

        {/* Toggle icon-only button */}
        <button
          className="absolute top-4 left-4 z-50  dark:bg-gray-800 rounded-full p-1  md:block hidden"
          onClick={() => setIconOnly((prev) => !prev)}
          aria-label={iconOnly ? "Expand sidebar" : "Collapse sidebar"}
        >
          {iconOnly ? <MenuIcon size={20} /> : <CloseIcon size={20} />}
        </button>

        {/* Sidebar Content Wrapper for vertical distribution */}
        <div className="flex flex-col flex-1">
          {/* Logo Section */}
          <div className="mb-10 flex items-center justify-center">
            <MenuIcon size={28} className={`transition-all duration-300 ${iconOnly ? "" : "hidden"}`} />
            <div className={`transition-all duration-300 ${iconOnly ? "hidden" : "block"}`}>
              <h2 className="text-xl font-semibold tracking-wide">{client.name}</h2>
              <p className="text-xs opacity-60">{client.label}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 flex-1">
            {menu.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `sidebar-item flex items-center px-2 py-2 rounded-lg text-sm transition-all duration-300 ${
                      isActive ? "sidebar-item-active" : ""
                    } ${iconOnly ? "justify-center" : "gap-3 px-4"}`
                  }
                  onClick={() => setOpen(false)}
                >
                  <span className="flex items-center justify-center w-7 h-7">
                    <Icon size={20} />
                  </span>
                  <span className={`${iconOnly ? "hidden" : "inline"}`}>{item.name}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-gray-700 flex flex-col items-center">
          <Tag size={18} className={`mb-1 ${iconOnly ? "" : "hidden"}`} />
          <div className={`text-xs opacity-50 transition-all duration-300 ${iconOnly ? "hidden" : "block"}`}>
            {version} <br />
              {client.admin}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
