import pg, { Pool } from "pg";
import PropertiesReader from "properties-reader";

const properties = PropertiesReader("config/database.properties")

const db = new Pool({
    user: properties.get("db-user") as string,
    password: properties.get("db-pwd") as string,
    host: properties.get("db-host") as string,
    port: properties.get("db-port") as number,
}); 

export {db};