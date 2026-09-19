let cart = [];

// ================================
// ADD TO CART
// ================================
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
}


// ================================
// UPDATE CART
// ================================
function updateCart() {

    const cartContainer =
        document.getElementById("cartItems") ||
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cartTotal") ||
        document.getElementById("cart-total");

    if (!cartContainer) return;

    if (cart.length === 0) {

        cartContainer.innerHTML =
            "<p>Your cart is empty. 🍎</p>";

        if (cartTotal) {
            cartTotal.textContent = "₹0";
        }

        return;
    }

    let total = 0;

    let html = "";

    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        html += `
            <div class="cart-item">

                <h3>${item.name}</h3>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

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
                    ❌ Remove
                </button>

            </div>
        `;
    });

    cartContainer.innerHTML = html;

    if (cartTotal) {
        cartTotal.textContent = "₹" + total;
    }
}


// ================================
// INCREASE QUANTITY
// ================================
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// ================================
// DECREASE QUANTITY
// ================================
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    updateCart();
}


// ================================
// REMOVE ITEM
// ================================
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// ================================
// SEARCH FRUITS
// ================================
function searchFruits() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;

    const searchText =
        searchInput.value.toLowerCase();

    const fruitCards =
        document.querySelectorAll(".fruit-card");

    fruitCards.forEach(card => {

        const fruitName =
            (card.getAttribute("data-name") || "")
            .toLowerCase();

        if (fruitName.includes(searchText)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
}


// ================================
// WHATSAPP CHECKOUT
// ================================
function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty! 🍎");

        return;
    }

    const nameElement =
        document.getElementById("customer-name");

    const phoneElement =
        document.getElementById("customer-phone");

    const addressElement =
        document.getElementById("customer-address");

    if (!nameElement || !phoneElement || !addressElement) {

        alert("Delivery details fields are missing.");

        return;
    }

    const name =
        nameElement.value.trim();

    const phone =
        phoneElement.value.trim();

    const address =
        addressElement.value.trim();


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

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        orderDetails +=
            item.name +
            " x " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "\n";
    });


    const shopWhatsAppNumber =
        "919963913982";


    const message =
        "🍎 MB BROTHERS FRUITS SHOP - NEW ORDER\n\n" +

        "👤 Customer Name: " +
        name +
        "\n" +

        "📱 Customer Mobile: " +
        phone +
        "\n\n" +

        "🍊 ORDER DETAILS\n" +
        "--------------------\n" +

        orderDetails +

        "--------------------\n" +

        "💰 TOTAL: ₹" +
        total +
        "\n\n" +

        "📍 DELIVERY ADDRESS\n" +
        address +
        "\n\n" +

        "Thank you! 🙏";


    const whatsappURL =
        "https://wa.me/" +
        shopWhatsAppNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(whatsappURL, "_blank");
}


// ================================
// ONLINE PAYMENT - RAZORPAY
// ================================
async function payOnline() {

    if (cart.length === 0) {

        alert("Please add fruits to cart first.");

        return;
    }


    const cartTotalElement =
        document.getElementById("cartTotal") ||
        document.getElementById("cart-total");


    if (!cartTotalElement) {

        alert("Cart total not found.");

        return;
    }


    const totalText =
        cartTotalElement.innerText;


    const amount =
        Number(
            totalText.replace(/[^\d.]/g, "")
        );


    if (!amount || amount <= 0) {

        alert("Please add fruits to cart first.");

        return;
    }


    try {

        // CREATE RAZORPAY ORDER
        const response = await fetch(
            "https://mb-brothers-fruits-shop.onrender.com/create-order",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    amount: amount
                })
            }
        );


        const order = await response.json();


        if (!response.ok) {

            throw new Error(
                order.error ||
                "Unable to create payment order"
            );
        }


        // RAZORPAY CHECKOUT
        const options = {

            key: "rzp_live_TcLxFzDGHkbDsF",

            amount: order.amount,

            currency: "INR",

            name: "MB Brothers Fruits Shop",

            description: "Fruit Order",

            order_id: order.id,


            handler: async function (payment) {

                try {

                    // VERIFY PAYMENT
                    const verifyResponse =
                        await fetch(
                            "https://mb-brothers-fruits-shop.onrender.com/verify-payment",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    razorpay_order_id:
                                        payment.razorpay_order_id,

                                    razorpay_payment_id:
                                        payment.razorpay_payment_id,

                                    razorpay_signature:
                                        payment.razorpay_signature
                                })
                            }
                        );


                    const result =
                        await verifyResponse.json();


                    if (result.success) {

                        alert(
                            "Payment successful and verified! ✅"
                        );

                        // OPEN WHATSAPP ORDER
                        checkout();

                    } else {

                        alert(
                            "Payment verification failed."
                        );
                    }

                } catch (error) {

                    console.error(error);

                    alert(
                        "Payment verification failed."
                    );
                }
            },


            modal: {

                ondismiss: function () {

                    console.log(
                        "Payment window closed."
                    );
                }
            },


            theme: {

                color: "#2e7d32"
            }
        };


        const razorpay =
            new Razorpay(options);


        razorpay.open();


    } catch (error) {

        console.error(error);

        alert(
            "Payment could not be started."
        );
    }
}