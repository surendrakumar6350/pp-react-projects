import { CircleCheck, Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";




function UserCartItemsContent({cartItem}){
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.auth);
  

  function handleUpdateQuantity(getCartItem, typeOfAction){
      dispatch(updateCartQuantity({
        userId: user?.id,
        productId : getCartItem?.productId,
        quantity : typeOfAction === 'plus' ? getCartItem?.quantity + 1 :
        getCartItem?.quantity - 1,
      })).then((data)=> {
        if(data?.payload.success){
           toast(
          <div className="flex gap-3 items-center z-50">
            <p className="text-[16px] font-semibold text-green-600">
              {
                typeOfAction === 'plus' ? '1 unit added to your cart.' : 
                '1 unit removed from your cart.'
              }
            </p>
            <CircleCheck stroke="#16a34a"  className="w-5 h-5" />
          </div>,
          {
              duration: 8000, 
          }
        );
        }
      })
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
       if(data?.payload.success){
    toast(
          <div className="flex gap-3 items-center">
            <p className="text-[18px] font-semibold text-green-600">Product removed from your cart.</p>
            <CircleCheck stroke="#16a34a"  className="w-5 h-5" />
          </div>,
          {
              duration: 8000, 
          }
        );
  }
    });
  }

    return (
        <div className="flex items-center space-x-4">
            <img 
                src={cartItem?.image}
                alt={cartItem?.title}
                className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="font-extrabold">{cartItem?.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Button disabled={cartItem?.quantity === 1} onClick={()=> handleUpdateQuantity(cartItem, 'minus')} className="border cursor-pointer h-8 w-8 rounded-full border-gray-200" size="icon">
                    <Minus className="w-4 h-4"/>
                    <span className="sr-only">Decrease</span>
                </Button>
                <span className="text-gray-700">{cartItem?.quantity}</span>
                <Button disabled={cartItem?.quantity === cartItem?.totalStock} onClick={()=> handleUpdateQuantity(cartItem, 'plus')} className="border cursor-pointer h-8 w-8 rounded-full border-gray-200" size="icon">
                    <Plus className="w-4 h-4"/>
                    <span className="sr-only">Decrease</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-end">
               <p className="font-semibold">
                  $
                  {(
                    (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
                    cartItem?.quantity
                  ).toFixed(2)}
                </p>
                <Trash onClick={()=> handleCartItemDelete(cartItem)} className="cursor-pointer mt-1" size={20}/>
            </div>
        </div>
    )
};

export default UserCartItemsContent;