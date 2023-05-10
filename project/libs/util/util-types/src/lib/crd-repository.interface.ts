export interface CRDRepository<E, I, R> {
  findById(id: I): Promise<R | null>;
  create(item: E): Promise<R>;
  destroy(id: I): Promise<void>;
}
