import { Drawer } from 'antd'

interface CreateRoleProps {
  open: boolean
  onClose: () => void
}

const CreateRole = ({ open, onClose }: CreateRoleProps) => {
  return (
    <Drawer title='Basic Drawer' closable={{ 'aria-label': 'Close Button' }} onClose={onClose} open={open}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  )
}

export default CreateRole
