export default function calcTotals(cart) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const tax = Math.round(total * .11)
  const service = Math.round(total * .05)
  const rounding = Math.round((total + tax + service) / 100) * 100 - (total + tax + service)
  return { total, tax, service, rounding, finalTotal: total + tax + service + rounding }
}
