export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: string;
  selectedPlanDetails?: PlanDetails | null;
  onPaymentSuccess: () => void;
  onSubmitPayment: (data: unknown) => void;
}

export interface PlanDetails {
  name: string;
  price: number;
  currency: string;
}

export interface PackageInfo {
  name: string;
  price: string;
}

export interface StripePaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  packageInfo: PackageInfo;
}
