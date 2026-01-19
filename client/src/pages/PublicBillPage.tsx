import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import logoUrl from "@assets/generated_images/modern_retail_pos_logo_for_supermart.png";

export default function PublicBillPage({ params }: { params: { publicId: string } }) {
  const { data, isLoading, error } = useQuery({
    queryKey: [api.bills.getPublic.path, params.publicId],
    queryFn: async () => {
      const res = await fetch(buildUrl(api.bills.getPublic.path, { publicId: params.publicId }));
      if (!res.ok) throw new Error("Bill not found");
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Invaid Receipt</h1>
        <p className="text-muted-foreground">This bill link is invalid or has expired.</p>
      </div>
    );
  }

  const { bill, items } = data;

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 print:bg-white print:p-0">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
          <div className="flex items-center gap-2">
             <img src={logoUrl} alt="Logo" className="h-6 w-6 object-contain" />
             <span className="font-bold text-sm">SuperMart POS</span>
          </div>
        </div>

        <Card className="shadow-lg border-none print:shadow-none">
          <CardHeader className="text-center border-b bg-primary/5 pt-10 pb-8">
            <div className="flex justify-center mb-4">
               <img src={logoUrl} alt="SuperMart Logo" className="h-16 w-16 object-contain" />
            </div>
            <CardTitle className="text-3xl font-display font-bold">SuperMart POS</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Digital Tax Invoice</p>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Bill Details</h3>
                <p className="text-sm"><strong>Invoice:</strong> {bill.billNumber}</p>
                <p className="text-sm"><strong>Date:</strong> {format(new Date(bill.date), "PPP p")}</p>
                <p className="text-sm"><strong>Payment:</strong> <span className="capitalize">{bill.paymentMode}</span></p>
              </div>
              <div className="text-right">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Customer</h3>
                <p className="text-sm font-semibold">{bill.customerId ? "Registered Member" : "Walk-in Customer"}</p>
                <p className="text-xs text-muted-foreground">Thank you for shopping with us!</p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden mb-8">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="py-2">Item</TableHead>
                    <TableHead className="text-center py-2">Qty</TableHead>
                    <TableHead className="text-right py-2">Price</TableHead>
                    <TableHead className="text-right py-2">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="py-3">
                        <div className="font-medium text-sm">{item.product.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">{item.product.sku}</div>
                      </TableCell>
                      <TableCell className="text-center py-3">{item.quantity}</TableCell>
                      <TableCell className="text-right py-3 text-sm">₹{Number(item.price).toFixed(2)}</TableCell>
                      <TableCell className="text-right py-3 font-semibold text-sm">
                        ₹{(Number(item.price) * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{Number(bill.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹{Number(bill.taxTotal).toFixed(2)}</span>
                </div>
                {Number(bill.discountTotal) > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{Number(bill.discountTotal).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2 flex justify-between items-baseline">
                  <span className="font-bold text-lg text-primary">Total</span>
                  <span className="font-bold text-2xl text-primary">₹{Number(bill.grandTotal).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center border-t pt-8">
              <p className="text-xs text-muted-foreground mb-1">Electronic Receipt - No Signature Required</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Nexus POS v1.0</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
