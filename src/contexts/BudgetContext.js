import React, { useContext, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetsContext = React.createContext()

export default function useBudgets() {
  return useContext(BudgetsContext)
}

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', [])
  const [expences, setExpences] = useLocalStorage('expences', [])
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenceModal, setShowAddExpenceModal] = useState(false)
  const [viewExpenceModalBudgetId, setViewExpenceModalBudgetId] = useState()
  const [AddExpenceModalBudgetId, setShowAddExpenceModalBudgetId] = useState()

  const filterExpences = budgetId => expences.filter(expence => expence.budgetId === budgetId)

  const getBudgetExpences = budgetId => filterExpences(budgetId)

  function addExpence({ description, amount, budgetId }) {
    setExpences(prevExpences => [...prevExpences, { id: uuidV4(), description, amount, budgetId }])
  }

  function addBudget({name, max}) {
    setBudgets(prevBudgets => {
      if(prevBudgets.find(budget => budget.name === name)) return prevBudgets

      return [...prevBudgets, { id: uuidV4(), name, max }]
    })
  }

  function deleteBudget({ id }) {
    // TODO deal with expences
    setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id))
  }

  function deleteExpence({ id }) {
    setExpences(prevExpences => prevExpences.filter(expence => expence.id !== id))
  }

  function openAddExpenceModal(budgetId) {
    setShowAddExpenceModal(true)
    setShowAddExpenceModalBudgetId(budgetId)
  }

  return (
    <BudgetsContext.Provider value={{
      budgets,
      expences,
      getBudgetExpences,
      addExpence,
      addBudget,
      deleteBudget,
      deleteExpence,
      showAddBudgetModal,
      setShowAddBudgetModal,
      showAddExpenceModal,
      setShowAddExpenceModal,
      AddExpenceModalBudgetId,
      openAddExpenceModal,
      viewExpenceModalBudgetId,
      setViewExpenceModalBudgetId,
    }}>
      { children }
    </BudgetsContext.Provider>
  )
}