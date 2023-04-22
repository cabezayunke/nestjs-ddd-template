export interface ConnectionManager<CType> {
  connect(): Promise<void>
  disconnect(): Promise<void>
  getConnection(): CType;
}