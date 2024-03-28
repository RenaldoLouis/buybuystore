export interface PaginationQueryParams {
  page_no: number;
  per_page: number;
}


export interface PatchUserDetailPayload {
  first_name: string;
  last_name: string;
  phone: string;
  country_code: string;
  city: string;
  email: string;
  profile_image_url: string;
}

export interface PostCreateProjectPayload {
  name: string;
  budget: number;
  currency: string;
  budget_start?: string;
  budget_end?: string;
  manager_ids: string[];
  member_ids: string[];
}

export interface PostSignUpFormPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_code: string;
  city: string;
  profile_image_url?: string;
}