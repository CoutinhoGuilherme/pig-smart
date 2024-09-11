"use client";
import React, { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "../../(routes)/dashboard/_components/CardInfo"
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "../../../../utils/schema";
import { db } from "../../../../utils/dbConfig";

function Dashboard() {
  const {user} = useUser();

  const [budgetList, setBudgetList] = useState([])
  const [incomeList, setIncomeList] = useState([])
  const [expensesList, setExpensesList] = useState([])

  useEffect(() => {
    user && getBudgetList()
  }, [user])

  const getBudgetList = async () => {
    const result = await db.select({...getTableColumns(Budgets), totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number), totalItem: sql `count(${Expenses.id})`.mapWith(Number)}).from(Budgets).leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId)).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)).groupBy(Budgets.id).orderBy(desc(Budgets.id))

    setBudgetList(result)
    getAllExpenses();
    getIncomeList();
  }

  const getAllExpenses = async () => {
    const result = await db.select({id: Expenses.id, name: Expenses.name, amount: Expenses.amount, createdAt: Expenses.createdAt,}).from(Budgets).rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId)).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(Expenses.createdAt))

    setExpensesList(result)
  }

  const getIncomeList = async () => {
    try {
      const result = await db.select({...getTableColumns(Incomes), totalAmount: sql`sum(cast(${Incomes.amount} as numeric())`.mapWith(Number),}).from(Incomes).groupBy(Incomes.id)

      setIncomeList(result)
    } catch (error) {
      console.log("Error fetching income list", error);    
    }
  }

  return (
    <div className="p-8">
      <h2 className="font-bold text-4xl">Hi, Name {user?.fullName}</h2>
      <p className="text-gray-500">Heres what happening with your money. Lets manage your expenses</p>
      <CardInfo budgetList={budgetList} incomeList={incomeList}/>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          {/* <BarChartDashboard budgetList={budgetList}/>
          <ExpenseListTable expensesList={expensesList} refreshData={()=>getBudgetList}/> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
