import { UserEntity } from "@context/users/infrastructure/repository/UserEntity";
import { DataSource, EntitySchema } from "typeorm";
import { ConnectionManager } from "../../domain/data/ConnectionManager";

export type Entity = UserEntity;

export interface TypeOrmParams {
    host: string;
    port: number;
    database: string;
    models: EntitySchema[];
    user?: string;
    password?: string;    
    debug?: boolean;
}
export class TypeOrmConnectionManager implements ConnectionManager<DataSource> {

    dataSource: DataSource;

    constructor(private readonly config: TypeOrmParams) {}
  
    getConnection(): DataSource {
      return this.dataSource;
    }

    async connect(): Promise<void> {
      this.dataSource = new DataSource({
          type: "postgres",
          host: this.config.host,
          port: this.config.port,
          username: this.config.user,
          password: this.config.password,
          database: this.config.database,
          entities: this.config.models,
          logging: !!this.config.debug,
          logger: 'advanced-console'
      })
      
      await this.dataSource.initialize();
    }

    async disconnect(): Promise<void> {
        if(this.dataSource) {
            await this.dataSource.destroy()
        }
    }
}