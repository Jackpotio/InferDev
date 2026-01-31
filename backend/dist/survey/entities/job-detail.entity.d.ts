import { Job } from './job.entity';
export declare class JobDetail {
    job_id: string;
    title: string;
    img: string;
    subfields: string[];
    similarJobs: string[];
    job: Job;
}
