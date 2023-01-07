const createMPOrder = async (order) => {
  const { paid_amount, items, collector } = order.response;

  console.log(collector);
  console.log(paid_amount);
  console.log(items);
};

export default createMPOrder;
