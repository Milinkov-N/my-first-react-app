import BudgetCard from './BudgetCard'
import UncategorizedBudgetCard from './UncategorizedBudgetCard'
import useBudgets from '../contexts/BudgetContext'
import TotalBudgetCard from './TotalBudgetCard'

export default function BudgetsList() {
  const { budgets, getBudgetExpences, openAddExpenceModal } = useBudgets()

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr)',
      gap: '1rem',
      alignItems: 'flex-start'
    }}>
      { 
        budgets.map(budget => {
          const amount = getBudgetExpences(budget.id).reduce((total, expence) => total + expence.amount, 0)

          return (
            <BudgetCard
              key={ budget.id }
              name={ budget.name }
              amount={ amount }
              max={ budget.max }
              onAddExpenceClick={ () => openAddExpenceModal(budget.id) }
            >
              <BudgetCard.Controls id={ budget.id } />
            </BudgetCard>
          )  
        })
      } 
      <UncategorizedBudgetCard />
      <TotalBudgetCard />
    </div>
  )
}