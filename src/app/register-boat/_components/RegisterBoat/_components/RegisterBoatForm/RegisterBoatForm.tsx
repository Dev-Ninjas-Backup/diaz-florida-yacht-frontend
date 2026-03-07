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

import {
  createSellerInfo,
  createOnboardingBoat,
  createSetupIntent,
} from '@/services/onboarding';
import { loginService } from '@/services/auth';
import boatPreview from '@/assets/register-boat/boatPreview.svg';
import {
  createBoatRegistrationFormData,
  logBoatRegistrationData,
} from '@/lib/utils/boat-registration-transformer';
import { steps } from '@/lib/utils/register-boats-select-options';
import {
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
import { PaymentModal } from '../PaymentModal/PaymentModal';

const RegisterBoatForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
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

  useEffect(() => {
    const checkAuth = async () => {
      const cookies = document.cookie;

      // Check for isAuthenticated cookie (not httpOnly)
      const isAuth = cookies
        .split('; ')
        .find((row) => row.startsWith('isAuthenticated='))
        ?.split('=')[1];

      // Also try to get accessToken from httpOnly cookie via a different method
      const token = cookies
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

      console.log('isAuthenticated cookie:', isAuth);
      console.log('Found token:', token ? 'Yes' : 'No');

      if (isAuth === 'true' || token) {
        if (token) setAuthToken(token);
        setIsLoggedIn(true);
        setCurrentStep(2);
        setCompletedSteps([1]);
        console.log('User is logged in, starting at step 2');
      } else {
        console.log('User is not logged in, starting at step 1');
      }
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, []);

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

  const combineSchema = z.object({
    ...step1Schema.shape,
    ...step2Schema.shape,
    ...step3Schema.shape,
  });

  const form = useForm<z.infer<typeof combineSchema>>({
    resolver: zodResolver(combineSchema),
    mode: 'onChange',
    defaultValues: {
      selectedPackage: '',
      promoCode: '',
      promoFreeDays: 0,

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
  const promoCode = watch('promoCode') as string | undefined;
  const promoFreeDays = watch('promoFreeDays') as number | undefined;

  useEffect(() => {
    const fetchFieldLimitations = async () => {
      if (selectedPackage) {
        try {
          const response =
            await subscriptionPackageLimitations(selectedPackage);

          if (response?.data) {
            const limits = {
              picLimit: response.data.picLimit || 0,
              wordLimit: response.data.wordLimit || 0,
            };

            setFieldLimitations(limits);
          }
        } catch (error) {
          console.error('Error fetching field limitations:', error);
          toast.error('Failed to fetch package limitations');
        }
      } else {
        setFieldLimitations({ picLimit: 0, wordLimit: 0 });
      }
    };

    fetchFieldLimitations();
  }, [selectedPackage]);

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

      if (!authToken) {
        toast.error('Authentication required');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('planId', allFormData.selectedPackage);

      const boatInfo = {
        buildYear: parseInt(allFormData.buildYear),
        make: allFormData.make,
        model: allFormData.model,
        name: allFormData.name,
        boatDimensions: {
          lengthFeet: parseInt(allFormData.lengthFeet) || 0,
          lengthInches: parseInt(allFormData.lengthInches) || 0,
          beamFeet: parseInt(allFormData.beamFeet) || 0,
          beamInches: parseInt(allFormData.beamInches) || 0,
          draftFeet: parseInt(allFormData.draftFeet) || 0,
          draftInches: parseInt(allFormData.draftInches) || 0,
        },
        boatClass: allFormData.class,
        material: allFormData.material,
        propMaterial: allFormData.propMaterial,
        condition: allFormData.condition,
        cabinsNumber: parseInt(allFormData.numCabins),
        headsNumber: parseInt(allFormData.numHeads),
        enginesNumber: parseInt(allFormData.numEngines),
        engines: allFormData.engines?.map((engine) => ({
          hours: parseInt(engine.hours) || 0,
          horsepower: parseInt(engine.totalPower) || 0,
          make: engine.make,
          model: engine.model,
          fuelType: engine.engineFuelType,
          propellerType: engine.propellerType,
        })),
        fuelType: allFormData.fuelType,
        price: parseFloat(allFormData.price),
        city: allFormData.city,
        state: allFormData.state,
        zip: allFormData.zip,
        description: allFormData.description,
        videoURL: allFormData.embedUrl || '',
        extraDetails:
          allFormData.moreDetails
            ?.filter((d) => d.title && d.description)
            ?.map((d) => ({
              key: d.title,
              value: d.description,
            })) || [],
      };

      formDataToSend.append('boatInfo', JSON.stringify(boatInfo));

      if (allFormData.coverPhoto) {
        formDataToSend.append('covers', allFormData.coverPhoto);
      }

      if (allFormData.mediaGallery && allFormData.mediaGallery.length > 0) {
        allFormData.mediaGallery.forEach((file) => {
          formDataToSend.append('galleries', file);
        });
      }

      const res = await createOnboardingBoat(authToken, formDataToSend);

      if (res?.success === false) {
        if (res.error) {
          toast.error(res.error);
        } else if (res.message) {
          toast.error(res.message);
        } else {
          toast.error('Failed to submit boat listing');
        }
        return;
      }

      if (res?.success) {
        const boatId = res.data?.listingPreview?.id;

        const setupRes = await createSetupIntent(
          authToken,
          allFormData.selectedPackage,
        );

        if (setupRes?.success === false) {
          toast.error(
            setupRes.message ||
              setupRes.error ||
              'Failed to create payment intent',
          );
          return;
        }

        if (setupRes?.data?.setupIntentSecret) {
          localStorage.setItem(
            'paymentIntentClientSecret',
            setupRes.data.setupIntentSecret,
          );
          localStorage.setItem('userId', res.data?.userId || '');
          localStorage.setItem('boatId', boatId || '');
          setShowPaymentModal(true);
          toast.success(
            res.message || 'Boat listing created! Proceed to payment.',
          );
          setCompletedSteps([...completedSteps, 3]);
        } else {
          toast.error('Invalid payment response');
        }
      } else {
        toast.error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error(
        error?.message || 'An error occurred while submitting the form',
      );
    }
  };

  const handleNext = async () => {
    setBackendErrors({});
    let isValid = false;
    if (currentStep === 1) {
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
      if (!isValid) {
        const errors = form.formState.errors;
        const firstError = Object.keys(errors)[0] as keyof typeof errors;
        const errorMessage = errors[firstError]?.message;
        toast.error(
          errorMessage || 'Please fill all required fields correctly',
        );
        return;
      }

      const formData = getValues();
      const sellerData = {
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.contactNumber,
        country: formData.country,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };

      const createRes = await createSellerInfo(sellerData);

      if (createRes?.success === false) {
        toast.error(
          createRes.message ||
            createRes.error ||
            'Failed to create seller account',
        );
        return;
      }

      if (createRes?.success) {
        const loginRes = await loginService({
          email: formData.email,
          password: formData.password,
        });

        if (loginRes?.success === false) {
          toast.error(
            loginRes.message || 'Auto-login failed. Please login manually.',
          );
          return;
        }

        if (loginRes?.success && loginRes.data?.token) {
          setAuthToken(loginRes.data.token);
          toast.success('Account created and logged in successfully!');
          setCompletedSteps([...completedSteps, 1]);
          setCurrentStep(2);
        }
      }
      return;
    } else if (currentStep === 2) {
      isValid = await trigger(['selectedPackage']);
      if (!isValid) {
        const errors = form.formState.errors;
        if (errors.selectedPackage) {
          toast.error(
            errors.selectedPackage.message || 'Please select a package',
          );
        }
        return;
      }
    } else if (currentStep === 3) {
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
      if (!isValid) {
        const errors = form.formState.errors;
        const firstError = Object.keys(errors)[0] as keyof typeof errors;
        const errorMessage = errors[firstError]?.message;
        toast.error(
          errorMessage || 'Please fill all required fields correctly',
        );
        return;
      }
      if (isValid) {
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

  const handlePaymentSubmit = () => {
    const allFormData = getValues() as BoatRegistrationFormValues;

    logBoatRegistrationData(allFormData);

    const formDataToSend = createBoatRegistrationFormData(allFormData);

    return formDataToSend;
  };

  const handlePaymentSuccess = () => {
    setCompletedSteps([...completedSteps, 3]);
  };

  if (isCheckingAuth) {
    return (
      <div>
        <CustomContainer>
          <div className="rounded-lg bg-[#F4F4F4] p-3 sm:p-5 md:p-8">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </CustomContainer>
      </div>
    );
  }

  return (
    <div>
      <CustomContainer>
        <div className="rounded-lg bg-[#F4F4F4] p-3 sm:p-5 md:p-8">
          <div className="flex items-center gap-3 flex-wrap justify-between">
            <h1 className="text-lg sm:text-3xl font-semibold">
              Listing Progress
            </h1>
            <span className="font-medium">
              Step {isLoggedIn ? currentStep - 1 : currentStep}
            </span>
          </div>

          <div className="mt-6">
            <ProgressSteps
              currentStep={isLoggedIn ? currentStep - 1 : currentStep}
              steps={
                isLoggedIn
                  ? steps?.slice(1)?.map((s) => s.label)
                  : steps?.map((s) => s.label)
              }
              className="mb-6"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
            <div
              className={`${currentStep === 1 || currentStep === 2 ? 'col-span-3' : 'col-span-2'}`}
            >
              <div>
                <FormProvider {...form}>
                  {currentStep === 1 && !isLoggedIn && <Step3Form />}
                  {currentStep === 2 && (
                    <Step1Form
                      subscriptionPlans={subscriptionPlans}
                      isLoading={isLoadingPlans}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step2Form fieldLimitations={fieldLimitations} />
                  )}
                </FormProvider>

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

            <div
              className={`${
                currentStep === 1 || currentStep === 2 ? 'hidden' : 'block'
              } w-full mx-auto`}
            >
              <div className="p-4 sticky top-60 bg-white rounded-xl mt-8">
                <h3 className="font-semibold mb-4">Preview</h3>

                {currentStep === 3 && (
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
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedPackage={selectedPackage}
        selectedPlanDetails={
          subscriptionPlans?.find((plan) => plan.id === selectedPackage) || null
        }
        onPaymentSuccess={handlePaymentSuccess}
        onSubmitPayment={handlePaymentSubmit}
        appliedPromo={
          promoCode && promoFreeDays
            ? { code: promoCode, freeDays: promoFreeDays }
            : null
        }
      />
    </div>
  );
};

export default RegisterBoatForm;
