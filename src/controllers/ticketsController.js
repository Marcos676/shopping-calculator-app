import { User, Ticket } from "../database/models/index.js";
import { validationResult } from "express-validator";

function sendError(valError, res) {
  let errors = valError;
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.mapped(),
    });
  }
}

const allTicketsList = async (req, res) => {
  try {
    const lists = await Ticket.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
      ],
    });
    res.json(lists);
  } catch (error) {
    console.error("Error al obtener tickets:", error);
    res.status(500).json({ error: "Error al obtener tickets" });
  }
};

const ticketsList = async (req, res) => {
  try {
    const lists = await Ticket.findAll({
      where: {
        user_id: req.user.id,
      },
    });
    res.json(lists);
  } catch (error) {
    console.error("Error al obtener tickets:", error);
    res.status(500).json({ error: "Error al obtener tickets" });
  }
};

const createTicket = async (req, res) => {
  sendError(validationResult(req), res);
  let body = req.body;

  try {
    await Ticket.create({
      name: body.name.trim(),
      product_list: body.productList,
      user_id: req.user.id,
    });
    res.json({
      ok: true,
    });
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    res.status(500).json({ error: "Error al crear el ticket" });
  }
};

export { allTicketsList, ticketsList, createTicket };
