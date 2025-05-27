import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  CircleCheck
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
    ];

    const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: Shirt },
    { id: "adidas", label: "Adidas", icon: WashingMachine },
    { id: "puma", label: "Puma", icon: ShoppingBasket },
    { id: "levi", label: "Levi's", icon: Airplay },
    { id: "zara", label: "Zara", icon: Images },
    { id: "h&m", label: "H&M", icon: Heater },
    ];

function ShoppingHome() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const {productList, productDetails} = useSelector((state)=> state.shopProducts);
    const {user} = useSelector((state)=> state.auth);
    const slides = [bannerOne, bannerTwo, bannerThree];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    function handleNavigateToListingPage(getCurrentItem, section){
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section] : [getCurrentItem.id]
        }
        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate(`/shop/listing`)
    };

    function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductDetails(getCurrentProductId))
      };

     function handleAddToCart(getCurrentProductId){
    //console.log(getCurrentProductId)
    dispatch(addToCart(
      {
        userId: user?.id, 
        productId: getCurrentProductId, 
        quantity: 1 
      }))
    .then((data)=> {
      if(data?.payload.success){
        dispatch(fetchCartItems(user?.id));
          toast(
                    <div className="flex gap-3 items-center">
                      <p className="text-[18px] font-semibold text-green-600">Product added to your cart.</p>
                      <CircleCheck stroke="#16a34a"  className="w-5 h-5" />
                    </div>,
                    {
                        duration: 8000, 
                    }
                  );
      }
    })
  }

    useEffect(()=> {
        const timer = setInterval(()=>{
            setCurrentSlide(prevSlide=> (prevSlide + 1)% slides.length)
        }, 6000)

        return ()=> clearInterval(timer);
    },[]);

    useEffect(()=> {
        dispatch(fetchAllFilteredProducts({filterParams : {}, sortParams : 'price-lowtohigh'}))
    },[dispatch]);

     useEffect(()=>{
        if(productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails])

        
    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden">
                {
                    slides.map((slide, index)=>(
                    <img
                        src={slide}
                        key={index}
                        className={`${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                        } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                    />
                    ))}
                    <Button 
                     onClick={()=> setCurrentSlide(prevSlide=> (prevSlide - 1 + slides.length) % slides.length)}
                     className="border border-gray-200 absolute
                     top-1/2 left-4 cursor-pointer transform  -translate-y-1/2 bg-white/80" size="icon">
                        <ChevronLeftIcon className="w-4 h-4"/>
                    </Button>
                     <Button
                     onClick={()=> setCurrentSlide(prevSlide=> (prevSlide + 1 + slides.length) % slides.length)} 
                     className="border border-gray-200 absolute
                     top-1/2 cursor-pointer right-4 transform -translate-y-1/2 bg-white/80" size="icon">
                        <ChevronRightIcon className="w-4 h-4"/>
                    </Button>
            </div>
            {/*Category's filter section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
                    <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {
                            categoriesWithIcon.map(categoryItem => 
                            <Card onClick={()=> handleNavigateToListingPage(categoryItem, 'category')}  key={categoryItem.id} className="cursor-pointer border border-gray-200 hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <categoryItem.icon className="w-12 h-12 mb-4 text-black"/> 
                                    <span className="font-bold">{categoryItem.label}</span>
                                </CardContent>
                            </Card>)
                        }
                    </div>
                </div>
            </section>
            {/*Brand's filter section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
                    <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {
                            brandsWithIcon.map(brandItem => 
                            <Card onClick={()=> handleNavigateToListingPage(brandItem, 'brand')}   key={brandItem.id} className="cursor-pointer border border-gray-200 hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <brandItem.icon className="w-12 h-12 mb-4 text-black"/> 
                                    <span className="font-bold">{brandItem.label}</span>
                                </CardContent>
                            </Card>)
                        }
                    </div>
                </div>
            </section>
            {/* Products section */}
            <section className="py-12"> 
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
                        </div>
                        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {
                                productList && productList.length > 0 ?
                                productList.map((productItem, index) => (<div key={index}>
                                    <ShoppingProductTile handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails} product={productItem}/>
                                </div>)) : null

                            }
                        </div>
            </section>
                    <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
        </div>
    )
};

export default ShoppingHome;