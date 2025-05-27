import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";



function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}){
   
    return (
        <Card className="w-full max-w-sm bg-white border-none mx-auto"> 
            <div>
                <div className="relative">
                    <img 
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                </div>
                <CardContent>
                    <h2 
                        className="text-xl text-left font-bold mb-2 mt-2"
                        title={product?.title}
                        >
                        {product?.title?.length > 13 ? `${product.title.slice(0, 13)}...` : product?.title}
                    </h2>
                    <div className="flex justify-between items-center mb-2">
                        <span
                        className={`${
                            product?.salePrice > 0 ? "line-through" : ""
                        } text-lg font-semibold text-primary`}
                        >
                        ${product?.price}
                        </span>
                        {product?.salePrice > 0 ? (
                        <span className="text-lg font-bold">${product?.salePrice}</span>
                        ) : null}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-4 items-center">
                    <Button onClick={() => {setOpenCreateProductsDialog(true);
                        setCurrentEditedId(product?._id);
                        setFormData(product);
                    }} className="buttonStyle">Edit</Button>
                    <Button onClick={()=> handleDelete(product?._id)} className="buttonStyle">Delete</Button>
                </CardFooter>
            </div>
        </Card>
    );
}

export default AdminProductTile;