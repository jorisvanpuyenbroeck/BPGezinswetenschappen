import { Project } from './project';

export interface Organisation {
  organisationId: number;
  name: string;
  address?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  url?: string;
  contact?: string;
  projects?: Project[];
}

export interface OrganisationCreateDto {
  name: string;
  address?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  url?: string;
  contact?: string;
}

export interface OrganisationReadDto {
  organisationId: number;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  url: string;
  contact: string;
}

export interface OrganisationUpdateDto {
  name?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  url?: string;
  contact?: string;
}
