export default interface UserData {
  id?: number,
  username?: string,
  email?: string,
  roles?: Array<string>
  accessToken?: string
  tokenType?: string
}

// import with: import type UserData from "~/types/userData.ts";
