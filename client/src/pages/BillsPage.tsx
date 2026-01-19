import { Sidebar } from "@/components/Sidebar";
import { useBills } from "@/hooks/use-bills";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText } from "lucide-react";
import { format } from "date-fns";

export default function BillsPage() {
  const { data: bills, isLoading } = useBills();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold">Transaction History</h1>
          <p className="text-muted-foreground mt-1">View past bills and payment records.</p>
        </div>

        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill Number</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills?.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-mono text-primary font-medium">{bill.billNumber}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {bill.date ? format(new Date(bill.date), "PPP p") : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{bill.paymentMode}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold">₹{bill.grandTotal}</TableCell>
                    <TableCell className="text-right">
                      <button className="text-primary hover:underline text-sm flex items-center justify-end w-full">
                        <FileText className="h-3 w-3 mr-1" /> View
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
                {bills?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No bills found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
}
