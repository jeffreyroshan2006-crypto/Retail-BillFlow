import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { paymentModes } from "@shared/schema";
import { Loader2, CreditCard, Banknote, Smartphone, Wallet } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentMode: typeof paymentModes[number], discount: number) => void;
  totalAmount: number;
  isProcessing: boolean;
}

export function CheckoutModal({ isOpen, onClose, onConfirm, totalAmount, isProcessing }: CheckoutModalProps) {
  const [paymentMode, setPaymentMode] = useState<typeof paymentModes[number]>("cash");
  const [discount, setDiscount] = useState<number>(0);

  const finalTotal = Math.max(0, totalAmount - discount);

  const handleConfirm = () => {
    onConfirm(paymentMode, discount);
  };

  const getIcon = (mode: string) => {
    switch (mode) {
      case "cash": return <Banknote className="h-4 w-4 mr-2" />;
      case "card": return <CreditCard className="h-4 w-4 mr-2" />;
      case "upi": return <Smartphone className="h-4 w-4 mr-2" />;
      case "wallet": return <Wallet className="h-4 w-4 mr-2" />;
      default: return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Complete Payment</DialogTitle>
          <DialogDescription>
            Confirm the payment details to finalize the bill.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label>Bill Total</Label>
            <div className="text-3xl font-bold text-primary">
              ₹{totalAmount.toFixed(2)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Discount Amount (₹)</Label>
              <Input 
                type="number" 
                min="0"
                value={discount} 
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="font-mono"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Final Amount</Label>
              <div className="h-10 px-3 py-2 rounded-md bg-muted font-mono font-semibold flex items-center">
                ₹{finalTotal.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select 
              value={paymentMode} 
              onValueChange={(val: any) => setPaymentMode(val)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentModes.map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    <div className="flex items-center capitalize">
                      {getIcon(mode)}
                      {mode}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isProcessing} className="w-full sm:w-auto">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Payment"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
