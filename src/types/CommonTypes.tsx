export type Errors<T> = Partial<Record<keyof T, string>>;

export type Paginated<T> = {
  count: number;
  previous: string | null;
  next: string | null;
  results: T[];
};

export type PaginationParams = {
  limit: number;
  offset: number;
};

export type ModelProps = {
  id: Readonly<number>;
  created_date: Readonly<string>;
  modified_date: Readonly<string>;
};

export type Model<T> = T & ModelProps;
