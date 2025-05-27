import { User } from './user';
import { UserSlot } from './userslot';

export interface Role {
  roleId: number;
  name: string;
  users: User[];
  userSlots: UserSlot[];
}
