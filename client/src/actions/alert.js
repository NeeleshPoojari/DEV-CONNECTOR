import { Types } from "../actions/types";
import { v4 as uuidv4 } from 'uuid';

export default function setAlert(msg, alertType) {
  const id = uuidv4();
  return {
    type: Types.SET_ALERT,
    payload: { msg, alertType, id }
  };
}
