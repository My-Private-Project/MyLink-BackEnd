import { AuthenticatedRequest } from "@/middlewares";
import bodyService from "@/services/body-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function bodyGet(req: AuthenticatedRequest, res: Response) {
  const { name } = req.params;

  try {
    const body = await bodyService.findBody(name);
    return res.status(httpStatus.CREATED).send(body);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}