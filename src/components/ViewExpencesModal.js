import { Modal, Button, Stack } from 'react-bootstrap'
import useBudgets, { UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext'
import { currencyFormatter } from '../utils'

export default function ViewExpencesModal({ budgetId, handleClose }) {
  const { getBudgetExpences, budgets, deleteBudget, deleteExpence } = useBudgets()

  const expences = getBudgetExpences(budgetId)
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(budget => budget.id === budgetId)

      console.log(budgetId != null);

  return (
    <Modal show={ budgetId != null } onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction='horizontal' gap='2'>
            <div>Expences - { budget?.name }</div>
            {
              budgetId !== UNCATEGORIZED_BUDGET_ID && (
                <Button variant='outline-danger' onClick={ () => {
                  deleteBudget(budget)
                  handleClose()
                }}>Delete</Button>
              )
            }
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction='vertical' gap='3'>
          {
            expences.map(expence => (
              <Stack direction='horizontal' gap='2' key={ expence.id }>
                <div className='me-auto fs-4'>{ expence.description }</div>
                <div className='fs-5'>
                  { currencyFormatter.format(expence.amount) }
                </div>
                <Button
                  size='sm'
                  variant='outline-danger'
                  onClick={ () => deleteExpence(expence) }
                >&times;</Button>
              </Stack>
            ))
          }
        </Stack>
      </Modal.Body>
    </Modal>
  )
}