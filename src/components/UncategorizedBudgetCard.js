import BudgetCard from './BudgetCard'
import useBudgets, { UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext'

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpences } = useBudgets()
  const amount = getBudgetExpences(UNCATEGORIZED_BUDGET_ID).reduce((total, expence) => total + expence.amount, 0) 

  if (amount === 0) return null
  
  return (
    <BudgetCard
      name='Uncategorized'
      amount={ amount }
      gray
      { ...props}
    >
      <BudgetCard.Controls id={ UNCATEGORIZED_BUDGET_ID } />
    </BudgetCard>
  ) 
}