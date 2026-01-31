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
exports.SurveyService = void 0;
const common_1 = require("@nestjs/common");
const survey_repository_1 = require("./survey.repository");
const survey_result_entity_1 = require("./entities/survey-result.entity");
const submitted_answer_entity_1 = require("./entities/submitted-answer.entity");
let SurveyService = class SurveyService {
    constructor(surveyRepository) {
        this.surveyRepository = surveyRepository;
    }
    async getJobs() {
        const jobs = await this.surveyRepository.findAllJobs();
        return jobs.reduce((acc, job) => {
            acc[job.id] = job.name;
            return acc;
        }, {});
    }
    async getJobDetails() {
        const jobDetails = await this.surveyRepository.findAllJobDetails();
        return jobDetails.reduce((acc, detail) => {
            acc[detail.job_id] = {
                title: detail.title,
                img: detail.img,
                subfields: detail.subfields,
                similarJobs: detail.similarJobs,
            };
            return acc;
        }, {});
    }
    async getSurveyQuestions() {
        return this.surveyRepository.findAllSurveyQuestions();
    }
    async recommendation(submitSurveyDto) {
        const { answers } = submitSurveyDto;
        const jobs = await this.surveyRepository.findAllJobs();
        const jobDetails = await this.surveyRepository.findAllJobDetails();
        if (jobs.length === 0) {
            throw new common_1.InternalServerErrorException('직업 데이터가 없습니다. 데이터 시딩을 실행해주세요.');
        }
        const scores = {};
        jobs.forEach(job => (scores[job.id] = 0));
        const subfieldScores = {};
        jobDetails.forEach(detail => {
            if (detail.subfields) {
                detail.subfields.forEach(subfield => (subfieldScores[subfield] = 0));
            }
        });
        const optionIds = answers.map(a => a.optionId);
        const selectedOptions = await this.surveyRepository.findOptionsByIds(optionIds);
        if (optionIds.length !== selectedOptions.length) {
            throw new common_1.NotFoundException('선택한 옵션 중 일부를 찾을 수 없습니다.');
        }
        const submittedAnswers = [];
        for (const option of selectedOptions) {
            for (const job in option.score) {
                scores[job] = (scores[job] || 0) + option.score[job];
            }
            for (const subfield in option.subfieldScores) {
                subfieldScores[subfield] = (subfieldScores[subfield] || 0) + option.subfieldScores[subfield];
            }
            const submittedAnswer = new submitted_answer_entity_1.SubmittedAnswer();
            submittedAnswer.surveyOption = option;
            submittedAnswers.push(submittedAnswer);
        }
        const topJobId = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b), jobs[0].id);
        const topJobDetails = jobDetails.find(detail => detail.job_id === topJobId);
        let topSubfield = '';
        if (topJobDetails && topJobDetails.subfields && topJobDetails.subfields.length > 0) {
            topSubfield = topJobDetails.subfields.reduce((a, b) => ((subfieldScores[a] || 0) > (subfieldScores[b] || 0) ? a : b), topJobDetails.subfields[0] || '');
        }
        const surveyResult = new survey_result_entity_1.SurveyResult();
        surveyResult.topJob = topJobId;
        surveyResult.topSubfield = topSubfield;
        surveyResult.scores = scores;
        surveyResult.subfieldScores = subfieldScores;
        surveyResult.submittedAnswers = submittedAnswers;
        const savedResult = await this.surveyRepository.saveSurveyResult(surveyResult);
        const topJob = await this.surveyRepository.findJobById(topJobId);
        return {
            topJob: topJob ? topJob.name : topJobId,
            topSubfield,
            scores,
            subfieldScores,
            resultId: savedResult.id,
        };
    }
};
exports.SurveyService = SurveyService;
exports.SurveyService = SurveyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [survey_repository_1.SurveyRepository])
], SurveyService);
//# sourceMappingURL=survey.service.js.map