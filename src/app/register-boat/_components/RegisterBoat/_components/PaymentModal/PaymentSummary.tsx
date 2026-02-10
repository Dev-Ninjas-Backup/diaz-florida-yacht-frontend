import { PackageInfo } from './types';

interface PaymentSummaryProps {
  packageInfo: PackageInfo;
}

export const PaymentSummary = ({ packageInfo }: PaymentSummaryProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-medium">Selected Package:</span>
        <span className="font-semibold text-gray-900">{packageInfo.name}</span>
      </div>

      <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center">
        <span className="text-gray-600 font-medium">Total Payable:</span>
        <span className="font-bold text-lg text-blue-600">
          {packageInfo.price}
        </span>
      </div>
    </div>
  );
};
