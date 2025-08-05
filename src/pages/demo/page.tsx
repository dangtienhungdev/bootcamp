import { withTimestamp } from '@/guard/demo/withTimestamp'

const withFilteredItems = (minLength: number) => {
  return function <P extends { items: string[] }>(WrapperComponent: React.ComponentType<P>) {
    return function (props: P) {
      const filteredItems = props.items.filter((item) => item.length >= minLength)
      return <WrapperComponent {...props} items={filteredItems} />
    }
  }
}

const ItemList = ({ items }: { items: string[] }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

const FilteredItemList = withFilteredItems(4)(ItemList)

/**
 * withFilteredItems(4)
 * -> là một gọi hàm, đang gọi đến HOC withFilteredItems và truyền vào tham số là số 4
 *
 */

const DemoPage = () => {
  const items = ['hi', 'hello', 'ok', 'world', 'no']

  return (
    <div>
      <FilteredItemList items={items} />
    </div>
  )
}

// export default DemoPage
const DemoPageWithTimestamp = withTimestamp(DemoPage)

export default DemoPageWithTimestamp
