import { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import useBudgets, { UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext'

export default function AddExpenceModal({ show, handleClose, defaultBudgetId }) {
  const descriptionRef = useRef()
  const amountRef  = useRef()
  const budgetIdRef  = useRef()
  const { budgets, addExpence } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()

    addExpence({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value
    })
    handleClose()
  }

  return (
    <Modal show={ show } onHide={ handleClose }>
      <Form onSubmit={ handleSubmit }>
        <Modal.Header closeButton>
          <Modal.Title>New Expence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputDescription descRef={ descriptionRef } />
          <InputAmount amountRef={ amountRef } />
          <SelectBudget budgetIdRef={ budgetIdRef } budgets={ budgets } defaultBudgetId={ defaultBudgetId } />
          <div className="d-flex justify-content-end">
            <Button variant='primary' type='submit'>Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}

function InputDescription({ descRef }) {
  return (
    <Form.Group className='mb-3' controlId='description'>
      <Form.Label>Description</Form.Label>
      <Form.Control
        ref={ descRef }
        type='text'
        required
      />
    </Form.Group>
  )
}

function InputAmount({ amountRef }) {
  return (
    <Form.Group className='mb-3' controlId='amount'>
      <Form.Label>Amount</Form.Label>
      <Form.Control
        ref={ amountRef }
        type='number'             
        min={ 0 }
        step={ 0.01 }
        required
      />
    </Form.Group>
  )
}

function SelectBudget({ budgetIdRef, budgets, defaultBudgetId }) {
  return (
    <Form.Group className='mb-3' controlId='budgetId'>
      <Form.Label>Budget</Form.Label>
      <Form.Select
        defaultValue={ defaultBudgetId }
        ref={ budgetIdRef }
      >
        <option
          id={ UNCATEGORIZED_BUDGET_ID }
          value={ UNCATEGORIZED_BUDGET_ID }
        >Uncategorized</option>
        {budgets.map(budget => (
          <option key={ budget.id } value={ budget.id }>
            { budget.name }
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}