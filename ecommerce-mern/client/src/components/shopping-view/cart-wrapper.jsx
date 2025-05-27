import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";


function UserCartWrapper({cartItems, setOpenCartSheet}){
    const navigate = useNavigate();

    const totalCartAmount = cartItems && cartItems.length > 0 ?
    cartItems.reduce((sum, currentItem)=> sum + (
        currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price)
        * currentItem?.quantity, 0) : 0
    
  
    return (
        <SheetContent className="sm:max-w-md ">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
             <div className="mt-8 space-y-4">
            {cartItems && cartItems.length > 0
            ? cartItems.map((item, index) => (
                    <div key={index}>
                        <UserCartItemsContent cartItem={item} />
                    </div>
                    ))
            : null}
        </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total: </span>
                    <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
                </div>
            </div>
            <Button onClick={()=> {navigate('/shop/checkout')
                setOpenCartSheet(false)}}
                className="buttonStyle w-full mt-6">
                <Check/>
                Checkout
                </Button>
        </SheetContent>
    )
};

export default UserCartWrapper;