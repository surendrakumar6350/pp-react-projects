import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";



function AddressCard({addressInfo, handleDeleteAddress, handleEditedaAddress}){
    return (
        <Card className="border border-gray-200">
            
            <CardContent className="grid gap-4 p-4">
                <Label>
                <span className="font-bold">Address: </span> {addressInfo?.address}
                </Label>
                <Label>
                <span className="font-bold">City: </span> {addressInfo?.city}
                </Label>
                <Label>
                <span className="font-bold">Pincode: </span> {addressInfo?.pincode}
                </Label>
                <Label>
                <span className="font-bold">Phone: </span> {addressInfo?.phone}
                </Label>
                <Label>
                <span className="font-bold">Notes: </span>   {addressInfo?.notes}
                </Label>
            </CardContent>
            <CardFooter className="flex gap-3 justify-center items-center">
                <Button onClick={()=> handleEditedaAddress(addressInfo)} className="buttonStyle">Edit</Button>
                <Button onClick={()=> handleDeleteAddress(addressInfo)} className="buttonStyle">Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard;