/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { Button } from '@/components/ui/button';
import {
  step1Schema,
  step2Schema,
  step3Schema,
} from '@/lib/validations/boat-registration-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { ProgressSteps } from '../ProgressSteps';
import Step1Form from '../Step1Form/Step1Form';
import Step2Form from '../Step2Form/Step2Form';
import Step3Form from '../Step3Form/Step3Form';

import boatPreview from '@/assets/register-boat/boatPreview.svg';
import {
  createBoatRegistrationFormData,
  logBoatRegistrationData,
} from '@/lib/utils/boat-registration-transformer';
import { steps } from '@/lib/utils/register-boats-select-options';
import {
  createSubscription,
  getAllSubscription,
  subscriptionPackageLimitations,
} from '@/services/main/subscription';
import type { BoatRegistrationFormValues } from '@/types/boat-registration-types';
import {
  FieldLimitations,
  SubscriptionApiResponse,
  SubscriptionPlan,
} from '@/types/subscription-types';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import PreviewSection from '../../../Preview/PreviewSection';
import SellerPreviewSection from '../../../Preview/SellerPreviewSection';
import { PaymentModal } from '../PaymentModal/PaymentModal';

const RegisterBoatForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlan[]
  >([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [backendErrors, setBackendErrors] = useState<Record<string, string>>(
    {},
  );
  const [fieldLimitations, setFieldLimitations] = useState<FieldLimitations>({
    picLimit: 0,
    wordLimit: 0,
  });

  // Fetch subscription plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoadingPlans(true);
        const { data: subscriptions } = await getAllSubscription();
        const transformed: SubscriptionPlan[] = subscriptions?.map(
          (plan: SubscriptionApiResponse) => ({
            id: plan.id,
            name: plan.title,
            price: plan.price,
            currency: plan.currency,
            billingCycle: `month`,
            featured: plan.isBest,
            featuredLabel: plan.isBest ? 'Most Popular' : undefined,
            features: plan.benefits,
            buttonText: 'Get Started',
            buttonStyle: plan.planType === 'PLATINUM' ? 'primary' : 'dark',
          }),
        );
        setSubscriptionPlans(transformed);
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      } finally {
        setIsLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  //Combine all schemas
  const combineSchema = z.object({
    ...step1Schema.shape,
    ...step2Schema.shape,
    ...step3Schema.shape,
  });

  const form = useForm<z.infer<typeof combineSchema>>({
    resolver: zodResolver(combineSchema),
    mode: 'onChange',
    defaultValues: {
      // Step 1
      selectedPackage: '',
      promoCode: '',
      // Step 2 - Boat Info
      buildYear: '',
      make: '',
      model: '',
      name: '',
      lengthFeet: '',
      lengthInches: '',
      beamFeet: '',
      beamInches: '',
      draftFeet: '',
      draftInches: '',
      class: '',
      material: '',
      fuelType: '',
      propMaterial: '',
      numEngines: '1',
      numCabins: '',
      numHeads: '',
      engines: [
        {
          hours: '',
          make: '',
          model: '',
          totalPower: '',
          propellerType: '',
          engineFuelType: '',
        },
      ],
      hours: '',
      make2: '',
      model2: '',
      totalPower: '',
      propellerType: '',
      engineFuelType: '',
      condition: '',
      price: '',
      city: '',
      state: '',
      zip: '',
      description: '',
      moreDetails: [],
      embedUrl: '',
      coverPhoto: undefined,
      mediaGallery: [],

      // Step 3 - Seller Info
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      country: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { watch, getValues, trigger, setValue } = form;
  const selectedPackage = watch('selectedPackage');
  const numEngines = watch('numEngines');

  // Fetch field limitations when package changes
  useEffect(() => {
    const fetchFieldLimitations = async () => {
      if (selectedPackage) {
        try {
          const response =
            await subscriptionPackageLimitations(selectedPackage);
          console.log('📦 Package Limitations Response:', response);
          if (response?.data) {
            const limits = {
              picLimit: response.data.picLimit || 0,
              wordLimit: response.data.wordLimit || 0,
            };
            console.log('✅ Setting Field Limitations:', limits);
            setFieldLimitations(limits);
          }
        } catch (error) {
          console.error('Error fetching field limitations:', error);
          toast.error('Failed to fetch package limitations');
        }
      } else {
        // Reset limitations if no package selected
        setFieldLimitations({ picLimit: 0, wordLimit: 0 });
      }
    };

    fetchFieldLimitations();
  }, [selectedPackage]);

  // Update engines array when numEngines changes
  useEffect(() => {
    const engineCount = parseInt(numEngines) || 1;
    const currentEngines = getValues('engines') || [];

    if (currentEngines.length !== engineCount) {
      const newEngines = Array.from({ length: engineCount }, (_, index) => {
        return (
          currentEngines[index] || {
            hours: '',
            make: '',
            model: '',
            totalPower: '',
            propellerType: '',
            engineFuelType: '',
          }
        );
      });
      setValue('engines', newEngines);
    }
  }, [numEngines, getValues, setValue]);

  // Watch form fields for real-time preview
  const watchedFields = watch([
    'buildYear',
    'make',
    'model',
    'name',
    'price',
    'condition',
    'lengthFeet',
    'lengthInches',
    'city',
    'state',
    'coverPhoto',
    'firstName',
    'lastName',
    'email',
    'contactNumber',
  ]);

  const handleFormSubmit = async () => {
    try {
      setBackendErrors({});
      const allFormData = getValues() as BoatRegistrationFormValues;
      const formDataToSend = createBoatRegistrationFormData(allFormData);
      const res = await createSubscription(formDataToSend);
      console.log('Subscription creation response:', res);
      if (res.data.paymentIntentClientSecret) {
        localStorage.setItem(
          'paymentIntentClientSecret',
          res.data.paymentIntentClientSecret,
        );
        localStorage.setItem('paymentIntentId', res.data.paymentIntentId);
        localStorage.setItem('userId', res.data.userId);
        setShowPaymentModal(true);
        toast.success('Form submitted successfully! Proceed to payment.');
      }
      setCompletedSteps([...completedSteps, 3]);
    } catch (error: any) {
      console.error('Form submission error:', error);

      // Handle backend validation errors
      if (error?.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages: Record<string, string> = {};

        // Parse backend errors and map them to form fields
        Object.keys(errors).forEach((key) => {
          errorMessages[key] = Array.isArray(errors[key])
            ? errors[key][0]
            : errors[key];
        });

        setBackendErrors(errorMessages);
        toast.error('Please fix the errors in the form');
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while submitting the form');
      }
    }
  };

  const handleNext = async () => {
    setBackendErrors({});
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(['selectedPackage']);
    } else if (currentStep === 2) {
      isValid = await trigger([
        'buildYear',
        'make',
        'model',
        'name',
        'lengthFeet',
        'lengthInches',
        'beamFeet',
        'beamInches',
        'draftFeet',
        'draftInches',
        'class',
        'material',
        'fuelType',
        'propMaterial',
        'numEngines',
        'numCabins',
        'numHeads',
        'engines',
        'condition',
        'price',
        'city',
        'state',
        'zip',
        'description',
      ]);
    } else if (currentStep === 3) {
      isValid = await trigger([
        'firstName',
        'lastName',
        'contactNumber',
        'country',
        'email',
        'city',
        'state',
        'zip',
        'username',
        'password',
        'confirmPassword',
      ]);
      if (isValid) {
        // Submit the form directly without payment modal
        handleFormSubmit();
        return;
      }
    }
    if (isValid && currentStep < 3) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };
  const handleBack = () => {
    setBackendErrors({});
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentSubmit = (paymentData: any) => {
    const allFormData = getValues() as BoatRegistrationFormValues;

    // Log the structured data in console
    console.log('\n========== BOAT REGISTRATION SUBMISSION ==========\n');
    logBoatRegistrationData(allFormData);

    // Create FormData for API submission
    const formDataToSend = createBoatRegistrationFormData(allFormData);

    // Log FormData entries
    console.log('\n========== FORMDATA ENTRIES ==========');
    console.log('planId:', formDataToSend.get('planId'));
    console.log(
      'boatInfo:',
      JSON.parse(formDataToSend.get('boatInfo') as string),
    );
    console.log(
      'sellerInfo:',
      JSON.parse(formDataToSend.get('sellerInfo') as string),
    );
    console.log('covers:', formDataToSend.get('covers'));

    const galleries = formDataToSend.getAll('galleries');
    console.log('galleries:', galleries.length, 'files');
    galleries.forEach((file, index) => {
      if (file instanceof File) {
        console.log(
          `  Gallery ${index + 1}:`,
          file.name,
          `(${(file.size / 1024).toFixed(2)} KB)`,
        );
      }
    });

    console.log('\n========== PAYMENT DATA ==========');
    console.log(paymentData);
    console.log('\n==================================================\n');

    return formDataToSend;
  };

  const handlePaymentSuccess = () => {
    setCompletedSteps([...completedSteps, 3]);
  };

  return (
    <div>
      <CustomContainer>
        <div className="rounded-lg bg-[#F4F4F4] p-3 sm:p-5 md:p-8">
          {/* Heading */}
          <div className="flex items-center gap-3 flex-wrap justify-between">
            <h1 className="text-lg sm:text-3xl font-semibold">
              Listing Progress
            </h1>
            <span className="font-medium">Step {currentStep}</span>
          </div>

          {/* Progress Steps */}
          <div className="mt-6">
            <ProgressSteps
              currentStep={currentStep}
              steps={steps?.map((s) => s.label)}
              className="mb-6"
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
            {/* Form */}
            <div
              className={`${currentStep === 1 ? 'col-span-3' : 'col-span-2'}`}
            >
              <div>
                <FormProvider {...form}>
                  {currentStep === 1 && (
                    <Step1Form
                      subscriptionPlans={subscriptionPlans}
                      isLoading={isLoadingPlans}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step2Form fieldLimitations={fieldLimitations} />
                  )}
                  {currentStep === 3 && <Step3Form />}
                </FormProvider>

                {/* Backend Errors Display */}
                {Object.keys(backendErrors).length > 0 && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="text-red-800 font-semibold mb-2">
                      Please fix the following errors:
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {Object.entries(backendErrors).map(([field, message]) => (
                        <li key={field} className="text-red-600 text-sm">
                          <span className="font-medium">{field}:</span>{' '}
                          {message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="cursor-pointer"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  >
                    <span>Next </span>
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div
              className={`${
                currentStep === 1 ? 'hidden' : 'block'
              } w-full mx-auto`}
            >
              <div className="p-4 sticky top-60 bg-white rounded-xl mt-8">
                <h3 className="font-semibold mb-4">Preview</h3>

                {/* Boat Preview for Step 2 */}
                {currentStep === 2 && (
                  <PreviewSection
                    buildYear={watchedFields[0]}
                    make={watchedFields[1]}
                    model={watchedFields[2]}
                    name={watchedFields[3]}
                    price={watchedFields[4]}
                    condition={watchedFields[5]}
                    lengthFeet={watchedFields[6]}
                    lengthInches={watchedFields[7]}
                    city={watchedFields[8]}
                    state={watchedFields[9]}
                    coverPhoto={watchedFields[10]}
                    boatPreviewFallback={boatPreview}
                  />
                )}

                {/* Seller Info Preview for Step 3 */}
                {currentStep === 3 && (
                  <SellerPreviewSection
                    firstName={watchedFields[11]}
                    lastName={watchedFields[12]}
                    email={watchedFields[13]}
                    contactNumber={watchedFields[14]}
                    buildYear={watchedFields[0]}
                    make={watchedFields[1]}
                    model={watchedFields[2]}
                    price={watchedFields[4]}
                    city={watchedFields[8]}
                    state={watchedFields[9]}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedPackage={selectedPackage}
        selectedPlanDetails={
          subscriptionPlans.find((plan) => plan.id === selectedPackage) || null
        }
        onPaymentSuccess={handlePaymentSuccess}
        onSubmitPayment={handlePaymentSubmit}
      />
    </div>
  );
};

export default RegisterBoatForm;
