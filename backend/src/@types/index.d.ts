import { UserDocument } from "../models/user.model";

declare global {
  namespace Express {
    /**
     * Extends the Express User type so that `req.user`
     * matches the structure of the application's UserDocument.
     */
    interface User extends UserDocument {
      /** Unique identifier for the authenticated user */
      _id?: any;
    }
  }
}
