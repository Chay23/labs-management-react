import { getAttachedFileName } from './SubmissionsService';

export const submissionFilter = (submissions, searchValue) => {
  let submissionsList = [];
  for (let submission of submissions) {
    if (
      getAttachedFileName(submission.attached_file)
        .toLocaleLowerCase()
        .match(searchValue.toLocaleLowerCase())
    ) {
      submissionsList.push(submission);
    }
  }
  return submissionsList;
};
