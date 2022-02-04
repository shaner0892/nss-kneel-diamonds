import { getOrders, getMetals, getStyles, getSizes } from "./database.js"

const buildOrderListItem = (order) => {

    //finds the price of the chosen metal
    const metals = getMetals()

    // Remember that the function you pass to find() must return true/false
    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId
        }
    )
    let totalCost = foundMetal.price

     //finds the price of the chosen style
     const styles = getStyles()

     // Remember that the function you pass to find() must return true/false
     const foundStyle = styles.find(
         (style) => {
             return style.id === order.styleId
         }
     )
     totalCost += foundStyle.price
 
    //finds the price of the chosen size
    const sizes = getSizes()

    // Remember that the function you pass to find() must return true/false
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )
    totalCost += foundSize.price

     //interpolates the price into an HTML string
     const costString = totalCost.toLocaleString("en-US", {
         style: "currency",
         currency: "USD"
     })

    return `<li>
        Order #${order.id} cost ${costString}
    </li>`
}

// return `<li>
//         Order #${order.id} was placed on ${order.timestamp}
//     </li>`

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}
