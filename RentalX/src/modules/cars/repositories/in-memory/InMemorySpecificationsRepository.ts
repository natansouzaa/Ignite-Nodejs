import { Specification } from '../../infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class InMemorySpecificationsRepository implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter(specification =>
      ids.includes(specification.id),
    );

    return allSpecifications;
  }
}

export { InMemorySpecificationsRepository };
