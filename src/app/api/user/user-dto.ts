import { z } from 'zod';

export const UserDTO = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const UpdateUserDTO = UserDTO.partial();

export type TUserDTO = z.infer<typeof UserDTO>;
export type TUpdateUserDTO = z.infer<typeof UpdateUserDTO>;
