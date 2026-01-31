"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("./entities/job.entity");
const job_detail_entity_1 = require("./entities/job-detail.entity");
const survey_option_entity_1 = require("./entities/survey-option.entity");
const survey_question_entity_1 = require("./entities/survey-question.entity");
const survey_result_entity_1 = require("./entities/survey-result.entity");
let SurveyRepository = class SurveyRepository {
    constructor(jobRepository, jobDetailRepository, surveyOptionRepository, surveyQuestionRepository, surveyResultRepository) {
        this.jobRepository = jobRepository;
        this.jobDetailRepository = jobDetailRepository;
        this.surveyOptionRepository = surveyOptionRepository;
        this.surveyQuestionRepository = surveyQuestionRepository;
        this.surveyResultRepository = surveyResultRepository;
    }
    async findAllJobs() {
        return this.jobRepository.find();
    }
    async findJobById(id) {
        return this.jobRepository.findOne({ where: { id } });
    }
    async findAllJobDetails() {
        return this.jobDetailRepository.find();
    }
    async findAllSurveyQuestions() {
        return this.surveyQuestionRepository.find({ relations: ['options'] });
    }
    async findOptionsByIds(ids) {
        return this.surveyOptionRepository.find({ where: { id: (0, typeorm_2.In)(ids) } });
    }
    async saveSurveyResult(result) {
        return this.surveyResultRepository.save(result);
    }
};
exports.SurveyRepository = SurveyRepository;
exports.SurveyRepository = SurveyRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(1, (0, typeorm_1.InjectRepository)(job_detail_entity_1.JobDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(survey_option_entity_1.SurveyOption)),
    __param(3, (0, typeorm_1.InjectRepository)(survey_question_entity_1.SurveyQuestion)),
    __param(4, (0, typeorm_1.InjectRepository)(survey_result_entity_1.SurveyResult)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SurveyRepository);
//# sourceMappingURL=survey.repository.js.map