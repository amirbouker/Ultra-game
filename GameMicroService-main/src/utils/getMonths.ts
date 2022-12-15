export class GetMonths {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  getMonthsFromDates(endDate: Date) {
    return (
      new Date().getMonth() -
      new Date(endDate).getMonth() +
      12 * (new Date(endDate).getFullYear() - new Date().getFullYear())
    );
  }
}
