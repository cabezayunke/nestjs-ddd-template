import mongoose, { Mongoose } from "mongoose";
import { ConnectionManager } from "../../../domain/data/ConnectionManager";
import { Logger } from "../../../domain/Logger";
import { MongoParams, MongoUri } from "./MongoConfig";


export class MongooseConnectionManager implements ConnectionManager {

    private connection: Mongoose;

    constructor(private readonly config: MongoUri | MongoParams, private readonly logger: Logger) {}

    async connect(): Promise<void> {
        const db = mongoose.connection;
        const tags = { tags: "init,mongodb" };
        
        mongoose.set('debug', this.config.debug);

        db.on("connecting", () => {
            const uri = "uri" in this.config ? this.config.uri : `mongodb://${this.config?.host}:${this.config.port}/${this.config.database}`;
            this.logger.info(`connecting to ${uri}`, tags);
        });
        db.on("error", (error: Error) => {
            this.logger.error(`Error in MongoDb connection: ${error.toString()}`, { ...tags, error });
        });
        db.on("connected", () => {
            this.logger.info("MongoDB connected!", tags);
        });
        db.once("open", () => {
            this.logger.info("MongoDB connection opened!", tags);
        });
        db.on("reconnected", () => {
            this.logger.info("MongoDB reconnected!", tags);
        });
        db.on("disconnected", () => {
            this.logger.info("MongoDB disconnected!", tags);
        });

        this.connection = "uri" in this.config
            ? await mongoose.connect(this.config.uri, { autoIndex: true })
            : await mongoose.connect(
                `mongodb://${this.config.host}:${this.config.port}/${this.config.database}?authMechanism=DEFAULT`,
                {
                    user: (this.config as MongoParams).user,
                    pass: (this.config as MongoParams).password,
                    autoIndex: true
                },
            )      
    }

    async disconnect(): Promise<void> {
        if(this.connection) {
            await this.connection.disconnect();
        }
    }
}