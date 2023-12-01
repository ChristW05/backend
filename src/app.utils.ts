import { ValidationPipe, HttpStatus } from "@nestjs/common";

const PASSWORD_RULE  = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/;

const PASSWORD_RULE_MESSAGE = 'Le mot de passe doit contenir un lettre Majuscule et minuscule.'

const VALIDATION_PIPE = new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
})

export const REGEX = {
    PASSWORD_RULE,
};

export const MESSAGE = {
    PASSWORD_RULE_MESSAGE,
};
export const SETTING = {
    VALIDATION_PIPE,
};

