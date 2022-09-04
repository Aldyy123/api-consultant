import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersLogin } from "src/common/users-login/entities/users-login.entity";
import { Role, Users } from "src/common/users/entities";

const typeOrmConfig: TypeOrmModule = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'consultant',
    entities: ["dist/**/**.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true,
    seeds: ["src/database/seeds/**/*{.ts,.js}"],
    factories: ["src/database/factories/**/*{.ts,.js}"],
}

export {
    typeOrmConfig
}