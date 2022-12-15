export type SuccessDeletedResponse = {
  deleted: boolean;
  message: string;
};

export type Publisher = {
  id: string;
  name: string;
  siret: number;
  phone: string;
};
