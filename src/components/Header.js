import { Stack, Button } from 'react-bootstrap'
import useBudgets from '../contexts/BudgetContext'

export default function Header({ title }) {
  const { setShowAddBudgetModal, openAddExpenceModal } = useBudgets()

  return (
    <Stack direction='horizontal' gap='2' className='mb-4'>
      <h1 className='me-auto'>{ title }</h1>
      <Button variant='primary' onClick={ () => setShowAddBudgetModal(true) }>Add Budget</Button>
      <Button variant='outline-primary' onClick={ openAddExpenceModal }>Add Expence</Button>
    </Stack>
  )
}