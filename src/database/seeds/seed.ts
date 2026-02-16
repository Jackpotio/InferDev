import { runSeeders } from 'typeorm-extension';
import { AppDataSource } from '../data-source';
import SurveySeeder from './3-survey-data';
import JobSeeder from './2-job-data';

AppDataSource.initialize().then(async () => {
  await runSeeders(AppDataSource, {
    seeds: [JobSeeder, SurveySeeder],
  });

  process.exit(0);
});

