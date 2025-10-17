// Main types export file - provides clean imports for the application

// Common types
export * from "./common";

// Component types
export * from "./components/landing-page";

// Existing API types
export * from "./api";
export * from "./hotel";

// Type guards and utilities
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
