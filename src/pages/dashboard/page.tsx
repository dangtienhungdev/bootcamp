import { Card, Col, Row, Statistic, Typography } from 'antd'
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react'


const { Title } = Typography

const DashboardPage = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Total Users'
              value={1128}
              prefix={<Users size={20} />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Total Orders'
              value={93}
              prefix={<ShoppingCart size={20} />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Revenue'
              value={11280}
              prefix={<DollarSign size={20} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Growth'
              value={11.28}
              prefix={<TrendingUp size={20} />}
              suffix='%'
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title='Recent Activity'>
            <p>Welcome to your dashboard! This is where you can view all your important metrics and data.</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title='Quick Actions'>
            <p>Here you can perform quick actions and access frequently used features.</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardPage
