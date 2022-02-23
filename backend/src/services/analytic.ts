import { Analytic, AnalyticInterface } from "../models/Analytic";

async function getThisYearAnalyticData() {
  const date = new Date();
  const year = date.getFullYear() - 1;
  const month = date.getMonth();
  const analyticArray = await Analytic.find({ year }).exec();

  const report: any = {
    total_distributed_amount: 0,
    total_collected_amount: 0,
    total_transaction: 0,
    total_asnaf: 0,
    location: {},
    gender: {},
    month: 0,
    year: 0,
  };
  Object.keys(report).forEach((key: string) => {
    if (Array.isArray(analyticArray[0][key as keyof AnalyticInterface])) {
      report[key] = sumArrayValue(
        key as keyof AnalyticInterface,
        analyticArray
      );
      return;
    }
    const sum = analyticArray.reduce((total: number, element: any) => {
      return total + (element[key] as number);
    }, 0);
    report[key] = sum;
    return;
  });

  return report;
}

function sumArrayValue(key: keyof AnalyticInterface, arr: AnalyticInterface[]) {
  var holder: any = {};
  arr.forEach((analyticObj: AnalyticInterface) => {
    analyticObj[key].forEach((obj: any) => {
      if (holder.hasOwnProperty(obj.name)) {
        holder[obj.name] += obj.value;
      } else {
        holder[obj.name] = obj.value;
      }
    });
  });

  let results: any[] = [];
  Object.entries(holder).forEach(([key, value]) => {
    results.push({
      name: key,
      value: value,
    });
  });

  return results;
}

async function getThisMonthAnalyticData() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() - 1;
  return Analytic.findOne({ year, month }).exec();
}

export { getThisYearAnalyticData, getThisMonthAnalyticData };
