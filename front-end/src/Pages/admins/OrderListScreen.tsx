import { useGetMyOrdersQuery, useGetOrdersQuery } from "../../features/ordersSlice/orderApiSlice"

function OrderListScreen() {

  const {data:orders, isLoading, isError} = useGetOrdersQuery()
  console.log(orders)

  return (
    <>




    </>
  )
}

export default OrderListScreen