"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const survey_module_1 = require("./survey/survey.module");
const job_entity_1 = require("./survey/entities/job.entity");
const job_detail_entity_1 = require("./survey/entities/job-detail.entity");
const survey_question_entity_1 = require("./survey/entities/survey-question.entity");
const survey_option_entity_1 = require("./survey/entities/survey-option.entity");
const survey_result_entity_1 = require("./survey/entities/survey-result.entity");
const submitted_answer_entity_1 = require("./survey/entities/submitted-answer.entity");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [job_entity_1.Job, job_detail_entity_1.JobDetail, survey_question_entity_1.SurveyQuestion, survey_option_entity_1.SurveyOption, survey_result_entity_1.SurveyResult, submitted_answer_entity_1.SubmittedAnswer],
                    synchronize: true,
                    ssl: {
                        rejectUnauthorized: false,
                    },
                }),
            }),
            survey_module_1.SurveyModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map