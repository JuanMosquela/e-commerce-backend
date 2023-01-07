const createMPOrder = async (order, user) => {
  const { paid_amount, items, collector, order_status } = order.response;

  console.log(collector);
  console.log(paid_amount);
  console.log(items);
  try {
    const newOrder = {
      name: collector.nickname,
      products: items,
      paymentMethod: "Mercado Pago",
      orderStatus: order_status,
      orderBy: user.id



    }
    
  } catch (error) {
    
  }
};

export default createMPOrder;
