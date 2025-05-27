import { Slot } from './slot';

// Placeholder for PresentationSlot model. Update fields as needed.
export interface PresentationSlot {
  presentationId: number;
  presentation: any; // Use 'any' to avoid circular reference, or import Presentation if needed
  slotId: number;
  slot: Slot; // Use 'any' to avoid circular reference, or import Slot if needed
}
