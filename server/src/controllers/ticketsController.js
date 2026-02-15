import models from "../database/models/index.cjs";
const { User, Ticket } = models;
import { validationResult } from "express-validator";

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
        userId: req.user.id,
      },
    });
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error al obtener tickets:", error);
    res.status(500).json({ error: "Error al obtener tickets" });
  }
};

const createTicket = async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({
      errors: validationResult(req).mapped(),
    });
  }
  let body = req.body;

  try {
    await Ticket.create({
      name: body.name.trim(),
      productList: body.productList,
      userId: req.user.id,
    });
    res.status(200).json({ok: true});
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    res.status(500).json({ error: "Error al crear el ticket" });
  }
};

export { allTicketsList, ticketsList, createTicket };
