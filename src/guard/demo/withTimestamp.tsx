export const withTimestamp = (WrapperComponent: React.ComponentType<any>) => {
  return function (props: any) {
    const time = new Date().toLocaleTimeString()
    return <WrapperComponent {...props} timestamp={time} />
  }
}
