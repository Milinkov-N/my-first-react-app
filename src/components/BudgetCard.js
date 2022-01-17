import { Card, ProgressBar, Stack, Button } from 'react-bootstrap'
import { currencyFormatter } from '../utils'
import useBudgets from '../contexts/BudgetContext'

export default function BudgetCard({ name, amount, max,  gray, hideControls, children }) {
  const classNames = []
  switch (true) {
    case amount > max:
      classNames.push('bg-danger', 'bg-opacity-10')
      break;
    case gray:
      classNames.push('bg-light')
      break;
  }

  const formattedAmount = currencyFormatter.format(amount)
  const formattedMax = max && currencyFormatter.format(max)

  function getProgressBarVariant(amount, max) {
    const ratio = amount / max

    if(ratio  < .5) return 'primary'
    if(ratio  < .75) return 'warning'

    return 'danger'
  }

  return (
    <Card className={ classNames.join(' ') }>
      <Card.Body>
        <Header name={ name } amount={ formattedAmount } max={ formattedMax } />
        { max && (
          <ProgressBar
            className='rounded-pill'
            variant={ getProgressBarVariant(amount, max) }
            min={ 0 }
            max={ max }
            now={ amount }
          />
        ) }
        
        { !hideControls && (children || <Controls />) }
      </Card.Body>
    </Card>
  )
}

function Header({ name, amount, max }) {
  const MaxValue = () => <span className='text-muted fs-6 ms-1'>/ { max }</span>

  return (
    <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
      <h2 className='me-2 fs-4'>{ name }</h2>
      <div className='d-flex align-items-baseline'>
        { amount }
        { max && <MaxValue /> }
      </div>
    </Card.Title>
  )
}

function Controls({ id }) {
  const { openAddExpenceModal, setViewExpenceModalBudgetId } = useBudgets()

  return (
    <Stack direction='horizontal' gap='2' className='mt-4'>
      <Button variant='outline-primary' className='ms-auto' onClick={ () => openAddExpenceModal(id) }>Add Expence</Button>
      <Button variant='outline-secondary' onClick={ () => setViewExpenceModalBudgetId(id) }>View Expences</Button>
    </Stack>
  )
}

BudgetCard.Controls = Controls