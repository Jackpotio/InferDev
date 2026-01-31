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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmittedAnswer = void 0;
const typeorm_1 = require("typeorm");
const survey_result_entity_1 = require("./survey-result.entity");
const survey_option_entity_1 = require("./survey-option.entity");
const survey_question_entity_1 = require("./survey-question.entity");
let SubmittedAnswer = class SubmittedAnswer {
};
exports.SubmittedAnswer = SubmittedAnswer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubmittedAnswer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => survey_result_entity_1.SurveyResult, surveyResult => surveyResult.submittedAnswers),
    __metadata("design:type", survey_result_entity_1.SurveyResult)
], SubmittedAnswer.prototype, "surveyResult", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => survey_question_entity_1.SurveyQuestion),
    __metadata("design:type", survey_question_entity_1.SurveyQuestion)
], SubmittedAnswer.prototype, "surveyQuestion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => survey_option_entity_1.SurveyOption),
    __metadata("design:type", survey_option_entity_1.SurveyOption)
], SubmittedAnswer.prototype, "surveyOption", void 0);
exports.SubmittedAnswer = SubmittedAnswer = __decorate([
    (0, typeorm_1.Entity)()
], SubmittedAnswer);
//# sourceMappingURL=submitted-answer.entity.js.map