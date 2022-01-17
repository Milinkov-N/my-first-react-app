import BudgetCard from './BudgetCard'
import useBudgets from '../contexts/BudgetContext'

export default function TotalBudgetCard() {
  const { expences, budgets } = useBudgets()

  const amount = expences.reduce((total, expence) => total + expence.amount, 0) 

  const max = budgets.reduce((total, budget) => total + budget.max, 0)

  if (max === 0) return null
  
  return (
    <BudgetCard
      name='Total'
      amount={ amount }
      gray
      max={ max }
      hideControls
    />
  ) 
}