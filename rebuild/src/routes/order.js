const express = require("express");
const { fetchOrderById } = require("../services/tiendanube");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const orderId = req.query.id;

    if (!orderId) {
      return res.status(400).json({
        ok: false,
        error: {
          code: "missing_id",
          message: "Query parameter 'id' is required"
        }
      });
    }

    const order = await fetchOrderById(orderId);

    return res.status(200).json({
      ok: true,
      order: {
        id: order.id,
        number: order.number ?? null,
        status:
          order.status ||
          order.payment_status ||
          order.fulfillment_status ||
          null,
        created_at: order.created_at,
        total: order.total ?? null,
        shipping_tracking_code: order.shipping_tracking_code ?? null,
        shipping_tracking_url: order.shipping_tracking_url ?? null
      }
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
