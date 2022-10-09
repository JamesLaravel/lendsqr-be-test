import { APIHelper, APIRouter } from "../http/Middleware/APIHandlers";
import * as userController from "../http/Controllers/userController";

const router = APIRouter();

router.post("/create", (req, res) =>
  APIHelper({ req, res, controller: userController.addNewUser })
);

export default router;
