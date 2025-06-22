import { LoanProduct } from './schemas';

export const loanProducts: LoanProduct[] = [
  {
    id: 1,
    title: 'Single Family',
    propertyType: '1-4 Unit / Townhomes / Condos',
    loanAmount: {
      min: 300000,
      max: 3500000,
    },
    maxLtv: 0.8,
    termLength: '30 Year Fixed',
    additionalInfo: 'Interest Only Option',
  },
  {
    id: 2,
    title: 'Short Term Rentals',
    propertyType: '1-4 Unit / Townhomes / Condos',
    loanAmount: {
      min: 300000,
      max: 3500000,
    },
    maxLtv: 0.75,
    termLength: '30 Year Fixed',
    additionalInfo: 'Interest Only Option',
  },
  {
    id: 3,
    title: 'Multi Family',
    propertyType: '5+ Units / Mixed Use',
    loanAmount: {
      min: 300000,
      max: 10000000,
    },
    maxLtv: 0.75,
    termLength: '30 Year Fixed',
    additionalInfo: 'Interest Only Option',
  },
  {
    id: 4,
    title: 'Cross Portfolio',
    propertyType: '1-4 Units / Townhomes / Condos\n5-20 Unit Properties Allowed',
    loanAmount: {
      min: 1000000,
      max: 15000000,
    },
    maxLtv: 0.75,
    termLength: '30 Year Fixed',
    additionalInfo: 'Interest Only Option',
  },
];