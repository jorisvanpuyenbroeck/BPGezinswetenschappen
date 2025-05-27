import { Slot } from './slot';
import { User } from './user';

// Placeholder for UserSlot model. Update fields as needed.
export interface UserSlot {
  userId: number;
  user: User; // Use 'any' to avoid circular reference, or import User if needed
  slotId: number;
  slot: Slot; // Use 'any' to avoid circular reference, or import Slot if needed
  roleId?: number;
  role?: any; // Use 'any' to avoid circular reference, or import Role if needed
}
