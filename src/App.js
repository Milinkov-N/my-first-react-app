import { Container } from 'react-bootstrap'
import AddBudgetModal from './components/AddBudgetModal'
import AddExpenceModal from './components/AddExpenceModal'
import Header from './components/Header'
import BudgetsList from './components/BudgetsList'
import useBudgets from './contexts/BudgetContext'
import ViewExpencesModal from './components/ViewExpencesModal'

export default function App() {
  const {
    showAddBudgetModal,
    setShowAddBudgetModal,
    showAddExpenceModal,
    setShowAddExpenceModal,
    AddExpenceModalBudgetId,
    viewExpenceModalBudgetId,
    setViewExpenceModalBudgetId,
  } = useBudgets()
  
  return (
    <>
      <Container className='my-4'>
        <Header title='Budgets' />
        <BudgetsList />
      </Container>
      <AddBudgetModal
        show={ showAddBudgetModal }
        handleClose={ () => setShowAddBudgetModal(false) }
      />
      <AddExpenceModal
        show={ showAddExpenceModal }
        handleClose={ () => setShowAddExpenceModal(false) }
        defaultBudgetId={ AddExpenceModalBudgetId }
      />
      <ViewExpencesModal
        budgetId={ viewExpenceModalBudgetId }
        handleClose={ () => setViewExpenceModalBudgetId() }
      />
    </>
  )
}

