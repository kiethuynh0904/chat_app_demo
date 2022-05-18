export const sleepUtil = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
