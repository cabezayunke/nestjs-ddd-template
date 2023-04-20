
 

import { ModelCtor, Sequelize } from "sequelize-typescript";
import { Logger } from "../../domain/Logger";
import { ConnectionManager } from "../../domain/data/ConnectionManager";

export interface SequelizePgParams {
    host: string;
    port: number;
    database: string;
    models: ModelCtor[] | string[];
    user?: string;
    password?: string;    
    debug?: boolean;
}
export class SequilizePgConnectionManager implements ConnectionManager {

    private connection: Sequelize;

    constructor(private readonly config: SequelizePgParams, private readonly logger: Logger) {}

    async connect(): Promise<void> {
      // this.connection = new Sequelize({
      //   database: this.config.database,
      //   dialect: 'postgres',
      //   host: this.config.host,
      //   port: this.config.port,
      //   username: this.config.user,
      //   password: this.config.password,
        // logging: this.config.debug ? this.logger.debug.bind(this.logger) : false,
        // models: this.config.models
      // }); 
      this.connection = new Sequelize('postgresql://root@localhost:26257/defaultdb?sslmode=disable', {
        logging: this.config.debug ? this.logger.debug.bind(this.logger) : false,
        models: this.config.models
      })
    }

    async disconnect(): Promise<void> {
        if(this.connection) {
            await this.connection.close();
        }
    }
}