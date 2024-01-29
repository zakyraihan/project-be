import { TypeOrmModuleOptions } from "@nestjs/typeorm";
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 9000,  // lihat xampp
  username: "root", // username default xampp root
  password: "", // password default xampp string kosong
  database: "project_xi",
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
