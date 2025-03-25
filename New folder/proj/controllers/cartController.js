const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      const product = req.body.productId;
      cart.products.push({ productId: product });
      await cart.save();
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $pull: { products: { _id: req.params.id } } }
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, removeFromCart };
