import { AuthenticatedRequest } from "@/middlewares";
import cardService from "@/services/card-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function cardPost(req: AuthenticatedRequest, res: Response) {
  const { name, link, bodyId } = req.body;

  try {
    await cardService.createCard({ name, link, bodyId });
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function cardPut(req: AuthenticatedRequest, res: Response) {
  const { id, name, link } = req.body;

  try {
    await cardService.updateCard({id, name, link});
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function cardDelete(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    await cardService.deleteCard(Number(id));
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
