import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const WalletSection = ({ balance }) => {
  const [transferAmount, setTransferAmount] = useState('');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'deposit', amount: 500, date: '2024-03-01' },
    { id: 2, type: 'withdrawal', amount: 200, date: '2024-03-05' },
    { id: 3, type: 'deposit', amount: 1000, date: '2024-03-10' },
  ]);

  const handleTransfer = () => {
    // Implement transfer logic here
    console.log('Transfer amount:', transferAmount);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Wallet className="mr-2" /> Your Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transfer Funds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Enter amount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleTransfer} className="bg-green-500 hover:bg-green-600">
              Transfer
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {transaction.type === 'deposit' ? (
                      <span className="flex items-center text-green-500">
                        <ArrowDownLeft className="mr-1" /> Deposit
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500">
                        <ArrowUpRight className="mr-1" /> Withdrawal
                      </span>
                    )}
                  </TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletSection;