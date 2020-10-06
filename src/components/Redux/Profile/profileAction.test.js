import { postProfileSuccess } from "./profileAction";
import { POST_PROFILE_SUCCESS } from "./profileTypes";

test("returns action with type `POST_PROFILE_SUCCESS`", () => {
  const action = postProfileSuccess();
  expect(action).toEqual({ type: POST_PROFILE_SUCCESS });
});
