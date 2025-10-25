import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEmptyObject = (object: object) => {
  return Object.keys(object).length === 0;
};

export const isValidEmail = (email: string) => {
  const Pattern = /^[A-Za-z0-9._]{3,}@[a-zA-Z]{3,}[.]{1,1}[a-zA-Z.]{2,6}$/g;
  return Pattern.test(email);
};

export const httpErrorResponse = () => {
  return {
    status: 500,
    message: "Internal server issue. Please try again later.",
  };
};

export const getEventDateRangeText = ({
  locale,
  startDate,
  endDate,
  showYear
}: {
  locale: string;
  startDate: string;
  endDate: string;
  showYear?: boolean;
}) => {
  const startMonth = moment(startDate, "DD/MM/YYYY")
    .locale(locale)
    .format("MMMM");
  const endMonth = moment(endDate, "DD/MM/YYYY").locale(locale).format("MMMM");
  const endYear = moment(endDate, "DD/MM/YYYY").locale(locale).format("YYYY");

  const startDateOnly = moment(startDate, "DD/MM/YYYY").format("DD");
  const endDateOnly = moment(endDate, "DD/MM/YYYY").format("DD");

  if (startMonth === endMonth) {
    return `${startDateOnly} - ${endDateOnly} ${startMonth} ${showYear ? ` ${endYear}` : ""}`;
  }

  return `${startDateOnly} ${startMonth} - ${endDateOnly} ${endMonth} ${showYear ? ` ${endYear}` : ""}`;
};

export const rupiahFormat = (value: number) => {
  if (isNaN(value)) return 0;
  const reverse = value.toString().split("").reverse().join("");
  const rupiah = reverse.match(/\d{1,3}/g);

  if(rupiah) return rupiah.join(".").split("").reverse().join("");

  return null;
};

export const generateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const length = 16;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}