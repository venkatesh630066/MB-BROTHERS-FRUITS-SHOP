let cart = [];

// ADD TO CART
function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}


// DISPLAY CART
function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty. 🍎</p>";
        cartTotal.innerHTML = "Total: ₹0";
        return;
    }

    let total = 0;
    let html = "";

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        html += `
            <div style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:10px;
                padding:15px;
                margin-bottom:10px;
                border-bottom:1px solid #ddd;
                flex-wrap:wrap;
            ">

                <strong>${item.name}</strong>

                <span>
                    ₹${item.price}
                </span>

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <strong>
                    ${item.quantity}
                </strong>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

                <strong>
                    ₹${itemTotal}
                </strong>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    cartItems.innerHTML = html;

    cartTotal.innerHTML = "Total: ₹" + total;
}


// INCREASE QUANTITY
function increaseQuantity(index) {

    cart[index].quantity++;

    displayCart();
}


// DECREASE QUANTITY
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    displayCart();
}


// REMOVE ITEM
function removeFromCart(index) {

    cart.splice(index, 1);

    displayCart();
}


// SEARCH FRUITS
function searchFruits() {

    const searchInput =
        document.getElementById("searchInput").value.toLowerCase();

    const fruitCards =
        document.querySelectorAll(".fruit-card");

    fruitCards.forEach(card => {

        const fruitName =
            card.getAttribute("data-name");

        if (fruitName.includes(searchInput)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });
}


function placeOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty! 🍎");
        return;
    }

    const name =
        document.getElementById("customer-name").value.trim();

    const phone =
        document.getElementById("customer-phone").value.trim();

    const address =
        document.getElementById("customer-address").value.trim();

    if (name === "" || phone === "" || address === "") {
        alert("Please enter all delivery details.");
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    let total = 0;
    let orderDetails = "";

    cart.forEach(item => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        orderDetails +=
            item.name +
            " x " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "\n";
    });

    /*
      IMPORTANT:
      Replace this number with your shop WhatsApp number.
      Include country code 91.
      Example: 919876543210
    */

    const shopWhatsAppNumber = "916300665953";

    const message =
        "🍎 MB BROTHERS FRUITS SHOP - NEW ORDER\n\n" +

        "👤 Customer Name: " + name + "\n" +

        "📱 Customer Mobile: " + phone + "\n\n" +

        "🍊 ORDER DETAILS\n" +
        "--------------------\n" +

        orderDetails +

        "--------------------\n" +

        "💰 TOTAL: ₹" + total + "\n\n" +

        "📍 DELIVERY ADDRESS\n" +
        address + "\n\n" +

        "Thank you! 🙏";

    const whatsappURL =
        "https://wa.me/" +
        shopWhatsAppNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

}

// CART SYSTEM

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    alert(name + " added to cart!");
}

function updateCart() {
    const cartContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>₹${item.price} × ${item.quantity}</p>

                <button onclick="decreaseQuantity(${index})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>

                <button onclick="removeFromCart(${index})">
                    ❌ Remove
                </button>

                <strong>₹${itemTotal}</strong>
            </div>
        `;
    });

    if (cartTotal) {
        cartTotal.textContent = "₹" + total;
    }
}

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    function showOrderSuccess() {
    alert("🎉 Order Placed Successfully!\n\nThank you for shopping with MB Brothers Fruits Shop ❤️");
}

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (name === "" || phone === "" || address === "") {
        alert("Please enter your delivery details.");
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    let message = "";
    
    message += "================================%0A";
    message += "       MB BROTHERS FRUITS SHOP%0A";
    message += "================================%0A%0A";

    message += "             NEW ORDER%0A";
    message += "--------------------------------%0A";

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        message += item.name +
                   " x " +
                   item.quantity +
                   " = Rs." +
                   itemTotal +
                   "%0A";
    });

    message += "--------------------------------%0A";
    message += "TOTAL: Rs." + total + "%0A";
    message += "================================%0A%0A";

    message += "CUSTOMER DETAILS%0A";
    message += "--------------------------------%0A";
    message += "Name    : " + name + "%0A";
    message += "Mobile  : " + phone + "%0A";
    message += "Address : " + address + "%0A%0A";

    message += "Please confirm my order.%0A%0A";
    message += "Thank you for choosing MB Brothers Fruits Shop!";

    const phoneNumber = "919963913982";

    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        message;

    window.open(whatsappURL, "_blank");
    showOrderSuccess();

}
async function payOnline() {
    const totalText = document.getElementById("cartTotal").innerText;
    const amount = Number(totalText.replace(/[^\d.]/g, ""));

    if (!amount || amount <= 0) {
        alert("Please add fruits to cart first.");
        return;
    }

    try {
        const response = await fetch("https://mb-brothers-fruits-shop.onrender.com/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: amount })
        });

        const order = await response.json();

        if (!response.ok) {
            throw new Error(order.error || "Unable to create order");
        }

        const options = {
            key: "rzp_live_TcLxFzDGHkbDsF",
            amount: order.amount,
            currency: "INR",
            name: "MB Brothers Fruits Shop",
            description: "Fruit Order",
            order_id: order.id,

            handler: function (response) {
                alert("Payment successful!");
                console.log(response);
            },

            theme: {
                color: "#2e7d32"
            }
        };

        const razorpay = new Razorpay(options);
        razorpay.open();

    } catch (error) {
        console.error(error);
        alert("Payment could not be started.");
    }
}

