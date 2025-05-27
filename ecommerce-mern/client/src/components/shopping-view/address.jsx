import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";
import { CircleCheck } from "lucide-react";
import { data } from "react-router-dom";

const initialAddressFormData = {
    address : '',
    city : '',
    phone : '',
    pincode : '',
    notes : ''
}

function Address(){
    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {addressList} = useSelector(state => state.shopAddress);

   function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast(
                    <div className="flex gap-3 items-center">
                      <p className="text-[16px] font-semibold text-red-600">You can add max 3 addresses.</p>
                      <CircleCheck stroke="#dc2626"  className="w-5 h-5" />
                    </div>,
                    {
                        duration: 8000, 
                    }
                  );
                setFormData(initialAddressFormData);

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
             toast(
                    <div className="flex gap-3 items-center">
                      <p className="text-[16px] font-semibold text-green-600">Address updated successfully.</p>
                      <CircleCheck stroke="#16a34a"  className="w-5 h-5" />
                    </div>,
                    {
                        duration: 8000, 
                    }
                  );
                setFormData(initialAddressFormData);
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
             toast(
                    <div className="flex gap-3 items-center">
                      <p className="text-[16px] font-semibold text-green-600">Address added successfully.</p>
                      <CircleCheck stroke="#16a34a"  className="w-5 h-5" />
                    </div>,
                    {
                        duration: 8000, 
                    }
                  );
                setFormData(initialAddressFormData);
          }
        });
  }


    

    function handleDeleteAddress(getCurrentAddress){
        dispatch(deleteAddress({
            userId : user?.id,
            addressId : getCurrentAddress._id,
        } )).then(data =>{
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id))
                 toast(
                    <div className="flex gap-3 items-center">
                      <p className="text-[16px] font-semibold text-green-600">Address has been deleted successfully.</p>
                      <CircleCheck stroke="#16a34a"  className="w-5 h-5" />
                    </div>,
                    {
                        duration: 8000, 
                    }
                  );
            }
        })
    };

    function handleEditedaAddress(getCurrentAddress){
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address : getCurrentAddress?.address,
            city : getCurrentAddress?.city,
            phone : getCurrentAddress?.phone,
            pincode : getCurrentAddress?.pincode,
            notes : getCurrentAddress?.notes,
        })
    }

    useEffect(()=>{
        dispatch(fetchAllAddresses(user?.id))
    }, [dispatch])


    function isFormValid(){
        return Object.keys(formData).map(key=> formData[key].trim() !== '').every(item => item);
    }

    return (
        <Card className="border border-gray-200">
            <div className="mb-5 p-3 grid grid-cols-1 
            sm:grid-cols-2  gap-2">
                        {
                          addressList && addressList.length > 0
                        ? addressList.map((singleAddressItem, index) => (
                            <div key={index}>
                                <AddressCard
                                addressInfo={singleAddressItem}
                                handleDeleteAddress={handleDeleteAddress}
                                handleEditedaAddress={handleEditedaAddress}
                            />
                            </div>

                            ))
                : null}
            </div>
            <CardHeader>
                <CardTitle>
                    {
                        currentEditedId !== null ? 'Edit Address' : 'Add New Address'
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CommonForm
                 formData={formData}
                 setFormData={setFormData}
                 buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
                 onSubmit={handleManageAddress}
                 isBtnDisabled={!isFormValid()}
                formControls={addressFormControls}/>
            </CardContent>
        </Card>
    )
}

export default Address;