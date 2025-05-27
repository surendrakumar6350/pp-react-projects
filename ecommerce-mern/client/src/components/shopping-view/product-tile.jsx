import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";



function ShoppingProductTile({product, handleGetProductDetails, handleAddToCart}){
    return (
        <div>
            <Card className="w-full border border-gray-200 max-w-sm mx-auto">
                <div>
                    <div onClick={()=> handleGetProductDetails(product?._id)} className="relative">
                        <img src={product?.image}
                            alt={product?.title}
                            className="w-full h-[300px] object-cover rounded-t-lg"
                        />
                        {
                            product?.salePrice > 0 ? <Badge className="absolute top-2 left-2 bg-red-600
                            hover:bg-red-500 text-white px-4 py-1">Sale</Badge> : null
                        }
                    </div>
                    <CardContent className="py-5">
                        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                        <div className="flex justify-between items-center  mb-2">
                            <span className="text-[16px] text-gray-500">
                                {
                                    categoryOptionsMap[product?.category]
                                }
                        </span>
                              <span className="text-[16px] text-gray-500">
                                {
                                    brandOptionsMap[product?.brand]
                                }
                                </span>
                        </div>
                        <div className="flex justify-between  items-center mb-2">
                                <span  className={`${
                                    product?.salePrice > 0 ? "line-through" : ""
                                    } text-[20px] font-semibold text-primary`}>${product?.price}
                                </span>
                                            {
                                product?.salePrice > 0 ? 
                                 <span className="text-[20px] font-semibold text-primary">${product?.salePrice}</span>
                                 : null
                            }
                             
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button onClick={()=> handleAddToCart(product?._id)} className="buttonStyle w-full">Add to Cart</Button>
                    </CardFooter>
                </div>

            </Card>
        </div>
    )
};

export default ShoppingProductTile;