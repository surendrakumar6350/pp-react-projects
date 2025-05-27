import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogHeader, DialogTitle } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useState } from "react";


function ShoppingOrders(){

    const  [opendDetailsDialog, setOpenDetailsDialog] = useState(false);
    return (
        <Card className="border border-gray-200">
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="bg-background">
                    <TableHeader>
                        <TableRow className="border-b border-gray-200">
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>1232848</TableCell>
                            <TableCell>12/05/2025</TableCell>
                            <TableCell>In process</TableCell>
                            <TableCell>$1000</TableCell>
                            <TableCell>
                                <Dialog open={opendDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                                    <Button onClick={()=> setOpenDetailsDialog(true)} className="buttonStyle">
                                        View Details
                                    </Button>
                                    <DialogHeader>
                                        <DialogTitle></DialogTitle>
                                    </DialogHeader>
                                    <ShoppingOrderDetailsView/>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default ShoppingOrders;