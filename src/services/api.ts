import { AUTH, PROJECT } from "../constants/apiPaths";
import http from "./http";

import {
  PaginationQueryParams,
  PatchUserDetailPayload,
  PostCreateProjectPayload,
  PostSignUpFormPayload,
} from "./api.types";

export const auth = {
  adminSignUp: (payload: PostSignUpFormPayload) =>
    http.post(AUTH.ADMIN_SIGNUP, payload),
  verifyUserEmail: () => http.post(AUTH.VERIFY_EMAIL),
  fetchUserDetail: () => http.get(AUTH.USER_DETAIL),
  updateEmployeeDetails: (payload: PatchUserDetailPayload) =>
    http.patch(AUTH.USER_DETAIL, payload)
};

export const projects = {
  fetchAllProjects: () => http.get(PROJECT.ROOT),
  fetchProjects: (payload: PaginationQueryParams) =>
    http.get(PROJECT.ROOT, payload),
  createProject: (payload: PostCreateProjectPayload) =>
    http.post(PROJECT.ROOT, payload),
};

