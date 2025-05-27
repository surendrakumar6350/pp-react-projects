import { CircleCheck, StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/products-slice";


function ProductDetailsDialog({open, setOpen, productDetails}){
    const {user} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

     function handleAddToCart(getCurrentProductId){
    dispatch(addToCart(
      {
        userId: user?.id, 
        productId: getCurrentProductId, 
        quantity: 1 
      }))
    .then((data)=> {
      if(data?.payload.success){
        dispatch(fetchCartItems(user?.id));
        //setOpen(false)
          toast(
                    <div className="flex gap-3 items-center">
                      <p className="text-[16px] font-semibold text-green-600">Product added to your cart.</p>
                      <CircleCheck stroke="#16a34a"  className="w-5 h-5" />
                    </div>,
                    {
                        duration: 8000, 
                    }
                  );
      }
    })
  };

  function handleDialogClose(){
    setOpen(false);
    dispatch(setProductDetails())
}

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 sm:max-w-[80vw] lg:max-w-[70vw]">
                <DialogTitle className="hidden"></DialogTitle>
                <div className="relative overflow-hidden rounded-lg">
                    <img
                    src={productDetails?.image}
                    alt={productDetails?.title}
                    width={600} height={600}
                    className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-gray-600 text-2xl mb-5 mt-4">{productDetails?.description}</p>
                    </div>
                       <div className="flex items-center justify-between">
                            <p
                            className={`text-3xl font-bold text-primary ${
                                productDetails?.salePrice > 0 ? "line-through" : ""
                            }`}
                            >
                            ${productDetails?.price}
                            </p>
                            {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-gray-700">
                                ${productDetails?.salePrice}
                            </p>
                            ) : null}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                             <div className="flex items-center gap-0.5">
                                <StarIcon stroke="#071516" fill="#071516" className="w-5 h-5 "/>
                                <StarIcon stroke="#071516" fill="#071516" className="w-5 h-5 "/>
                                <StarIcon stroke="#071516" fill="#071516" className="w-5 h-5 "/>
                                <StarIcon stroke="#071516" fill="#071516" className="w-5 h-5 "/>
                                <StarIcon stroke="#071516" fill="#071516" className="w-5 h-5 "/>
                             </div>
                             <span className="text-gray-500">(4.5)</span>
                        </div>
                        <div className="mt-5 mb-5">
                            <Button onClick={()=> handleAddToCart(productDetails?._id)} className="buttonStyle w-full py-5">
                                Add to cart
                            </Button>
                        </div>
                        <Separator/>
                        <div className="max-h-[300px] overflow-auto">
                            <h2 className="text-xl font-bold mb-4">Reviews</h2>
                              <div className="grid gap-6">
                                <div className="flex gap-4">
                                    <Avatar className="w-10 h-10 border border-gray-200">
                                        <AvatarFallback> {user?.userName[0].toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold">{user?.userName}</h3>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <StarIcon stroke="#071516" fill="#071516" className="w-5 h-5 "/>
                                            <StarIcon stroke="#071516" fill="#071516" className="w-5 h-5 "/>
                                            <StarIcon stroke="#071516" fill="#071516" className="w-5 h-5 "/>
                                            <StarIcon stroke="#071516" fill="#071516" className="w-5 h-5 "/>
                                            <StarIcon stroke="#071516" fill="#071516" className="w-5 h-5 "/>
                                        </div>
                                        <p className="text-gray-500">This is an awesome product</p>
                                    </div>
                                </div>
                            </div>
                             
                            <div className="mt-6 flex gap-2">
                                <Input placeholder="Write a review..." className="border border-gray-200"/>
                                <Button className="buttonStyle">Submit</Button>
                            </div>
                        </div>
                </div>
            </DialogContent>
        </Dialog>
    )
};


export default ProductDetailsDialog;