"use client";
import React, { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { CardInfo } from "@clerk/nextjs";
import { getTableColumns } from "drizzle-orm";
import { Budgets } from "../../../../utils/schema";

function Dashboard() {
  const {user} = useUser();

  const [budgetList, setBudgetList] = useState([])
  const [incomeList, setIncomeList] = useState([])
  const [expenseList, setExpensesList] = useState([])

  useEffect(() => {
    user && getBudgetList()
  }, [user])

  const getBudgetList = async () => {
    const result = await db.select({...getTableColumns(Budgets), totalSpend: sql `sum(${expenses.amount})`.mapWith(Number), totalItem: sql `count(${expenses.id})`.mapWith(Number)}).from(Budgets).leftJoin(expenses, eq(Budgets.id, expenses.budgetId)).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)).groupBy(Budgets.id).orderBy(desc(Budgets.id))

    setBudgetList(result)
    getAllExpenses();
  }

  return (
    <div className="p-8">
      <h2 className="font-bold text-4xl">Hi, Name {user?.fullName}</h2>
      <p className="text-gray-500">Here's what happening with your money. Let's manage your expenses</p>
      <CardInfo budgetList={} incomeList={}/>
    </div>
  );
}

export default Dashboard;
