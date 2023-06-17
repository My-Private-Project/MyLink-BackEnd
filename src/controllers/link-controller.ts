import { AuthenticatedRequest } from "@/middlewares";
import linkService from "@/services/link-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function linkPost(req: AuthenticatedRequest, res: Response) {
  const { name } = req.body;
  const { userId } = req;

  try {
    const link = await linkService.createLink({ name, userId });
    return res.status(httpStatus.CREATED).json({
      id: link.id,
      name: link.name,
      userId: link.userId,
    });
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function linkGet(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const links = await linkService.allLinks(userId);
    return res.status(httpStatus.CREATED).send(links);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.OK).send([]);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function linkPut(req: AuthenticatedRequest, res: Response) {
  const { id, name } = req.body;

  try {
    await linkService.updateLink({id, name});
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function linkDelete(req: AuthenticatedRequest, res: Response) {
  const { id } = req.body;

  try {
    await linkService.deleteLink(id);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
