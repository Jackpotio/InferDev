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
exports.SurveyController = void 0;
const common_1 = require("@nestjs/common");
const survey_service_1 = require("./survey.service");
const submit_survey_dto_1 = require("./dto/submit-survey.dto");
let SurveyController = class SurveyController {
    constructor(surveyService) {
        this.surveyService = surveyService;
    }
    getJobs() {
        return this.surveyService.getJobs();
    }
    getJobDetails() {
        return this.surveyService.getJobDetails();
    }
    getSurveyQuestions() {
        return this.surveyService.getSurveyQuestions();
    }
    recommendation(submitSurveyDto) {
        return this.surveyService.recommendation(submitSurveyDto);
    }
};
exports.SurveyController = SurveyController;
__decorate([
    (0, common_1.Get)('jobs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SurveyController.prototype, "getJobs", null);
__decorate([
    (0, common_1.Get)('job-details'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SurveyController.prototype, "getJobDetails", null);
__decorate([
    (0, common_1.Get)('survey-questions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SurveyController.prototype, "getSurveyQuestions", null);
__decorate([
    (0, common_1.Post)('recommendation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_survey_dto_1.SubmitSurveyDto]),
    __metadata("design:returntype", void 0)
], SurveyController.prototype, "recommendation", null);
exports.SurveyController = SurveyController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [survey_service_1.SurveyService])
], SurveyController);
//# sourceMappingURL=survey.controller.js.map