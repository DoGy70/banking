import { Account, RecentTransactionsProps } from "@/types";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import BankTabItem from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";

function RecentTransactions({
  accounts,
  transactions = [],
  appwriteItemId,
  page,
}: RecentTransactionsProps) {
  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View All
        </Link>
      </header>
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="recent-transactions-tablist">
          {accounts.map((account: Account) => {
            return (
              <TabsTrigger key={account.id} value={account.appwriteItemId}>
                <BankTabItem
                  key={account.id}
                  account={account}
                  appwriteItemId={appwriteItemId}
                />
              </TabsTrigger>
            );
          })}
        </TabsList>
        {accounts.map((account: Account) => {
          return (
            <TabsContent
              value={account.appwriteItemId}
              key={account.id}
              className="space-y-4"
            >
              <BankInfo
                account={account}
                type="full"
                appwriteItemId={appwriteItemId}
                key={account.id}
              />
              <TransactionsTable transactions={transactions} />
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
export default RecentTransactions;
