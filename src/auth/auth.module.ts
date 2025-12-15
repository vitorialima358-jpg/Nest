import { forwardRef, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { UsuarioModule } from "../usuario/usuario.module";
import { jwtConstants } from "./constants/constants";

import { AuthService } from "./services/auth.service";
import { AuthController } from "./controller/auth.controller";

import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { Bcrypt } from "./bcrypt/bcrypt";

@Module({
    imports: [
        forwardRef(() => UsuarioModule),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        Bcrypt,
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    exports: [
        Bcrypt,
        AuthService // ✅ ISSO RESOLVE O ERRO
    ],
})
export class AuthModule {}
