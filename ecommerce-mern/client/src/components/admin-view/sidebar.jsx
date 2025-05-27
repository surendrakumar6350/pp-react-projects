import { ChartNoAxesCombined, LayoutDashboard, ShoppingBasket,BadgeCheck   } from "lucide-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

 const adminSidebarMenuItems = [
    {
        id : 'dashboard',
        label : 'Dashboard',
        path : '/admin/dashboard',
        icon : <LayoutDashboard/>
    },
    {
        id : 'products',
        label : 'Products',
        path : '/admin/products',
        icon : <ShoppingBasket/>
    },
    {
        id : 'orders',
        label : 'Orders',
        path : '/admin/orders',
        icon : <BadgeCheck/>
    }
]

function MenuItems({setOpen}){
    const navigate = useNavigate();
    const location = useLocation();
    
    return  <nav className="mt-8 flex flex-col gap-3">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;
        return (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              if (setOpen) setOpen(false);
            }}
            className={`flex items-center gap-2 rounded-md cursor-pointer px-3 py-2 menu-item text-xl sideMenuText ${isActive ? 'active' : ''}`}
          >
            {menuItem.icon}
            <span className="menu-label">{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
}

function AdminSideBar({open, setOpen}) {
    const navigate = useNavigate();

    return <Fragment>
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="w-64">
                <div className="flex flex-col h-full">
                    <SheetHeader className="border-b border-gray-200">
                        <SheetTitle className="flex gap-2 mt-5 mb-4">
                            <ChartNoAxesCombined size={30}/>
                            <span className="text-xl font-extrabold">Admin Panel</span>
                            </SheetTitle>
                    </SheetHeader>
                    <MenuItems setOpen={setOpen}/>
                </div>
            </SheetContent>
        </Sheet>
        <aside className="hidden w-64 flex-col border-r border-gray-200 bg-background p-6 lg:flex">
            <div
             onClick={()=> navigate("/admin/dashboard")}
             className="flex items-center gap-2 cursor-pointer">
                <ChartNoAxesCombined size={30}/>
                <h1 className="text-xl font-extrabold">Admin Panel</h1>
            </div>
            <MenuItems/>
        </aside>
    </Fragment>
}

export default AdminSideBar;