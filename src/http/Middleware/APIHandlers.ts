import { Request, Response, Router } from "express";
import { logger, isEmpty } from "../../utils";
import { UnprocessableEntityError } from "../../errorhandlers";

interface APIHelperDTO {
  req: Request | any;
  res: Response;
  controller: Function;
  expectPayload?: boolean;
  include?: string[];
}

/**
 *
 * @param req
 * @param res
 * @param controller
 * @param expectPayload
 */
export async function APIHelper({
  req,
  res,
  controller,
  expectPayload = true,
  include,
}: APIHelperDTO): Promise<any> {
  try {
    if (typeof req.body != "undefined" && Array.isArray(req.body)) {
      throw new UnprocessableEntityError({
        message: "Request body must be of type object",
      });
    }

    const payload = Object.assign(
      {},
      req.body,
      req.params,
      req.query,
      req.file
    );

    if (expectPayload && Object.keys(payload).length <= 0) {
      throw new UnprocessableEntityError({ message: "No payload sent" });
    }

    const { data, message } = await controller(
      include ? refineProps(req, include, payload) : payload
    );

    logger.info({
      message,
      data: payload,
      httpPath: req.path,
      httpMethod: req.method,
      function: controller.name,
    });

    return res.json({ success: true, message, data: data ? data : [] });
  } catch (error: any) {
    logger.error({
      message: error.message,
      error,
      httpPath: req.path,
      httpMethod: req.method,
      function: controller.name,
    });

    return res.status(error.httpCode || 400).json({
      success: false,
      message: error.message,
      errorType: error.errorType,
      verboseMessage: error.error,
    });
  }
}

export const APIRouter = (): Router => Router();

function refineProps(req: any, props: string[], payload: any) {
  const refinedPayload: any = { params: payload };

  for (const prop of props) {
    const propValue = req[prop];

    if (!propValue || isEmpty(propValue)) {
      logger.error({ message: `${prop} must not be undefined` });
      continue;
    }

    refinedPayload[prop] = propValue;
  }

  return refinedPayload;
}
